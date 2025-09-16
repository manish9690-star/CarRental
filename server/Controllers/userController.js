import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  Car from '../models/Car.js';


const generateToken = (userId) => {
    const payload=userId;
    return jwt.sign(payload,process.env.JWT_SECRET);
}


export const registerUser = async (req, res) => {
   try {
       const {name, email, password, role} = req.body;
     
       if(!name || !email || !password||password.length<8){
        return res.json({success:false,message:"All fields are required with password minimum length 8"})
       }

       const userExists = await User.findOne({email});
         if(userExists){
            return res.json({success:false,message:"User already exists"})
         }

         const hashedPassword = await bcrypt.hash(password,10);
         const user =await User.create({name,email,password:hashedPassword,role});
         const token =generateToken(user._id.toString());
         res.json({success:true,token})
   }
   catch (error) {
       console.log(error.message);
     res.json({success:false,message:error.message})
   }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({success:false,message:"Invalid email or password"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid email or password"})
        }
        const token = generateToken(user._id.toString());
        res.json({success:true,token})
    }
    catch (error) {
        console.log(error.message);
      res.json({success:false,message:error.message})

    }
}


//get user data

 export const getUserData = async(req,res)=>{
    try {
        const {user}=req;
        res.json({success:true,user})
    }catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({isAvailable:true});
        res.json({success: true, cars});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
};