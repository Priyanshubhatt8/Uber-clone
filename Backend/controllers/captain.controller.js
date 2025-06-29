const captainModel = require('../models/captain.model');
const { createCaptain } = require('../services/captain.service');

module.exports.registerCaptain = async (req, res, next) => {
    const {  email, password } = req.body;
    const { firstname, lastname } = req.body.fullname;
    const {color,plate,capacity,vehicleType} = req.body.vehicle;

    const iscaptainExists = await captainModel.findone({ email });
    if (iscaptainExists) {      
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    
    const captain = await createCaptain({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain, message: 'Captain registered successfully' });

} 

module.exports.loginCaptain = async (req, res, next) => {
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password'); 
   if(!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);     
    res.status(200).json({ token, captain, message: 'Login successful' });

}
