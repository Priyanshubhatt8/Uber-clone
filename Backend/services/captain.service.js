const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({ firstname, lastname, email, password, vehicle }) => {
  // Validate required fields
  if (!firstname || !email || !password || !vehicle) {
    throw new Error("All required fields (firstname, email, password, vehicle) must be provided");
  }

  // Create the captain
  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle,
  });

  return captain;
}