const Category = require('../models/Category')
const Property = require('../models/Property')
const Unit = require('../models/Unit')
const FilterChoice = require('../models/FilterChoice')

const { calculateOffset } = require('../../../utils/global')

/**
 * Create new category
 * @param {Object} categoryInput - Category input, validated by category validation
 * @returns {Category}
 */
const addCategory = async (categoryInput) => {
  /**
   * Save Category without properties
   * Iterate properties and save property without unit and fiter types
   * Iterate units and filterType and save those
   */
  const propertiesInput = categoryInput.properties
  delete categoryInput.properties

  const category = new Category(categoryInput)

  for (let i = 0; i < propertiesInput.length; i++) {
    const propertyInput = propertiesInput[i]

    const unitsInput = propertyInput.units
    delete propertyInput.units

    const filterChoicesInput = propertyInput.filterChoices
    delete propertyInput.filterChoices

    const property = new Property(propertyInput)

    for (let unitIndex = 0; unitIndex < unitsInput.length; unitIndex++) {
      const unit = new Unit(unitsInput[unitIndex])
      await unit.save()
      property.units.push(unit)
    }

    for (let filterChoiceIndex = 0; filterChoiceIndex < filterChoicesInput.length; filterChoiceIndex++) {
      const filterChoice = new FilterChoice(filterChoicesInput[filterChoiceIndex])
      await filterChoice.save()
      property.filterChoices.push(filterChoice)
    }

    await property.save()
    category.properties.push(property)
  }
  await category.save()
  return category
}

const getNonLeafCategories = async () => {
  const categories = await Category.find({
    isLeaf: false,
    isActive: true
  }).lean()
  return categories
}

const getCategories = async ({ filters, pageNo = 1, pageSize = 10, keyword }) => {
  pageNo = parseInt(pageNo)
  pageSize = parseInt(pageSize)

  const conditions = {}
  if (keyword) {
    conditions.name = {
      $regex: keyword
    }
  }

  const [categories, total] = await Promise.all([
    Category.find(conditions)
      .populate({
        path: 'properties',
        populate: [{
          path: 'units'
        }, {
          path: 'filterChoices'
        }]
      })
      .skip(calculateOffset({ pageNo, pageSize }))
      .limit(pageSize)
      .lean(),
    Category.countDocuments(conditions)
  ])

  const meta = {
    total,
    pageNo,
    pageSize
  }
  return {
    categories,
    meta
  }
}

const destoryCategory = async ({
  categoryId,
  categoryIds
}) => {
  let result
  if (categoryId) {
    result = await Category.deleteOne({
      _id: categoryId
    })
  }
  if (categoryIds && Array.isArray(categoryIds)) {
    result = await Category.deleteMany({
      _id: {
        $in: categoryIds
      }
    })
  }
  return result
}

module.exports = {
  addCategory,
  getNonLeafCategories,
  getCategories,
  destoryCategory
}
