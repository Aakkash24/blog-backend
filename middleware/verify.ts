import { NextFunction, Request,Response } from "express";
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify user authentication
 *     description: Middleware to verify user authentication. Checks for a valid Bearer token in the Authorization header.
 *     tags:
 *      - Authorization
 *     responses:
 *       403:
 *         description: Not authorized or token expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
const verify = (req:Request,res:any,next:NextFunction) => {
    console.log("Inside verify");
    if(!req.headers.authorization) {
        return res.status(403).json({msg:"Not authorized"})
    }
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,process.env.SECRET,(err:any,data:any)=>{
            if(err)
                return res.status(403).json({msg:"Token expired"})
            res.user = data;
            next();
        })
    }
}

export default verify;