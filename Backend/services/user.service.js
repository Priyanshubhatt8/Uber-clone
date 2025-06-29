const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
  // Validate required fields
  if (!firstname || !email || !password) {
    throw new Error("All required fields (firstname, email, password) must be provided");
  }

  // Create the user
  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
