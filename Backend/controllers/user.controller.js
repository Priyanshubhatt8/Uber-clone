const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const blacklistTokenModel = require('../models/blacklisttoken.model')

module.exports.registerUser = async (req, res, next) => {
    const { email, password } = req.body;
   const{firstname,lastname} = req.body.fullname
      const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword
    })
    const token = user.generateAuthToken()

    res.status(201).json({ token, user , message: 'User registered successfully' })


}

module.exports.login = async (req,res,next) => {
    const {email,password} = req.body

    const user = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(401).json({message:'Invalid email or password'})
    }
    
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'})
    }
    const token = user.generateAuthToken()
    res.cookie('token',token)
    res.status(200).json({ token, user , message:'Login successful' })
}

module.exports.getUserProfile = async (req,res,next) => {
    res.status(200).json({ user: req.user, message: 'User profile retrieved successfully' })
}


module.exports.logout = async(req,res,next) =>{
    res.clearCookie('token')
    const token = req.cookies.token || req?.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }
     await blacklistTokenModel.create({ token })

    res.status(200).json({ message: 'User logged out successfully' })


}