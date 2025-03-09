const USER = require("../models/user");
const express = require("express");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userregisterrouter = express.Router();
//register user 
userregisterrouter.post("./register",async(req,res)=>{
try {
    const {username , useremail , password} = req.body;
    //check if user is there
    let user = await USER.findOne({useremail});
    if(user) return res.status(400).json({msg:"user already exists"});
    //hash password 
    const salt = await bcyrpt.genSalt(10);
    const hashedpassword = await bycrypt.hash(password,salt);
    //save user
    user = new USER({username , useremail , password: hashedpassword});
    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
}
catch (err) {
    res.status(500).json({error : err.message});
}
});
module.exports = userregisterrouter;