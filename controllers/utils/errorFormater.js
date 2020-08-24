const errorFormater = (jsonErrors) => {
  // set a variable containing errors
  const errors = {};
  // set a variable containing the details of errors from the json errors
  const details = jsonErrors.details;
  console.log(details);
  // map through the error details
  details.map((detail) => {
    errors[detail.path] = [detail.message];
  });
  return errors;
};

const mongooseFormater = (jsonErrors) => {
  const errors = {};
  const details = jsonErrors.errors;
  for (const key in details) {
    errors[key] = [details[key].message];
  }
  return errors;
};

module.exports = { errorFormater, mongooseFormater };
