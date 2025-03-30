const jwt=require('jsonwebtoken');
const User=require('../users/user.model');

const JWT_Secret=process.env.JWT_Secret_KEY;

const generateToken = async (userId) => {
    try{
        const user= await User.findById(userId);
        if(!user){
            throw new Error('User not found');
        }
        const token= jwt.sign({userId:user._id, role: user.role}, JWT_Secret,{
            expiresIn: '1h',
        });
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
}

module.exports=generateToken;