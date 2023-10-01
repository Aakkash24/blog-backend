"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./Routes/user");
const blog_1 = require("./Routes/blog");
var bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const dotenv = require("dotenv").config();
const multer = require("multer");
exports.app = (0, express_1.default)();
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Blog API Documentation",
            version: "1.0.0",
            description: "This is the documentation for a Blog website"
        }
    },
    apis: ['./Routes/*.ts', './index.ts', './middleware/verify.ts'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
exports.app.use((req, res, next) => {
    const acceptHeader = req.header('Accept');
    if (acceptHeader && acceptHeader.includes('application/json')) {
        // Set the response format to JSON
        res.setHeader('Content-Type', 'application/json');
    }
    next();
});
const URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
// DB Connection
mongoose_1.default.connect(URL).then(() => {
    console.log('DB Connected');
}).catch((err) => {
    console.log(err);
});
exports.app.use("/user", user_1.userRouter);
exports.app.use("/blog", blog_1.blogRouter);
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use(bodyParser.json());
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
exports.app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
