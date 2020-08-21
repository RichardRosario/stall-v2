const User = require("./User");

// user input, create a new user and returns it
const addUser = async (userInput) => {
  const User = new User(userInput);
  await user.save();
  return user;
};

module.exports = { addUser };
