import {Request,Response} from 'express'
import User from '../models/User';

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userRegister = async(req:Request,res:Response) => {
    try {
        const existing  =  await User.findOne({uemail:req.body.email});
        if(existing){
            console.log("User already exists");
            return res.status(400);
        }
        const username = req.body.username;
        const uemail = req.body.email;
        var upassword = req.body.password;
        if(username==''||uemail==''||upassword=='')
        return res.status(400).json({msg:"Enter the details"});
        const hash = await bcrypt.hash(upassword,10);
        const newUser:any = await User.create({uname:username,uemail:uemail,upassword:hash});
        var {upassword,...other} = newUser._doc;
        const token = await jwt.sign({id:newUser._id},process.env.SECRET,{expiresIn:"1h"});
        console.log("Created successfully");
        return res.status(200).json({user:other,token})
    } catch (error) {
        console.log("Error");
        return res.status(400).json(error);
    }
}

const userLogin = async(req:Request,res:Response) => {
    try {
        const uemail = req.body.email;
        var upassword = req.body.password;
        const existing:any = await User.findOne({uemail:uemail});
        if(!existing)
        {
            throw new Error("User already existed");
        }
        const flag = bcrypt.compare(req.body.password,existing.upassword);
        if(!flag){
            throw new Error("Invalid credentials");
        }
        var {upassword,...other} = existing._doc;
        const token = await jwt.sign({id:existing._id},process.env.SECRET,{expiresIn:"1h"});
        return res.status(200).json({user:other,token});
    } catch (error) {
        return res.status(400).json(error);
    }
}

export {userLogin,userRegister};