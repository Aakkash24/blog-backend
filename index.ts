import express, { Application, json } from "express"
import mongoose from "mongoose"
import cors from "cors"
import { userRouter } from "./Routes/user"
import { blogRouter } from "./Routes/blog"
import Image from "./models/Image"

var bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const dotenv = require("dotenv").config()
const multer = require("multer")
export const app:Application = express()

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"Blog API Documentation",
            version:"1.0.0",
            description:"This is the documentation for a Blog website"
        }
    },
    apis: ['./Routes/*.ts','./index.ts','./middleware/verify.ts'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs)


app.use(cors())
app.use(express.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use((req,res,next)=>{
    const acceptHeader = req.header('Accept');
    if(acceptHeader && acceptHeader.includes('application/json')) {
    // Set the response format to JSON
    res.setHeader('Content-Type', 'application/json');
  }
  next();
})

const URL:any = process.env.MONGO_URL
const PORT:any = process.env.PORT

// DB Connection
mongoose.connect(URL).then(() => {
    console.log('DB Connected')
}).catch((err) => {
    console.log(err)
})


app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/**
 * @swagger
 * /images/{fileName}:
 *   get:
 *     summary: Get an image by filename
 *     tags:
 *       - Storage
 *     parameters:
 *       - in: path
 *         name: fileName
 *         schema:
 *           type: string
 *         required: true
 *         description: The filename of the image
 *     responses:
 *       200:
 *         description: Image found
 *       404:
 *         description: Image not found
 */


// Server 
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})


