import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req,res) => {
    const {fullName,email,password} = req.body;
    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({message:"Fill all mandatory fields!"}); 
        }
        if(password.length < 6) {
            return res.status(400).json({message:"Password must be at least 6 characters!"});
        }
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message:"email already registered!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPass,
        })

        if (newUser) {
            generateToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })

        } else {
            return res.status(400).json({message:"An unknown error has occured"});
        }

    } catch (error) {
        console.error("An error has occured during the sign-up process", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const login = async (req,res) => {
    const { email,password } = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message:"Invalid credentials!"}); 
        }

        const isPassCorrect = await bcrypt.compare(password, user.password);
        if(!isPassCorrect) { return res.status(400).json({message:"Invalid credentials!"});  }

        generateToken(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
        })

    } catch (error) {
        console.error("An error has occured during the sign-in process", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully!"});
    } catch (error) {
        console.error("An error has occured during the logout process", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const updateProfile = async(req,res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic) {
            return res.status(400).json({message:"No Profile Pic detected!"}); 
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findOneAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})

        res.status(200).json(updatedUser); 

    } catch (error) {
        console.log("Error in updating profile : ", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in check auth controller : ", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}