import { Router } from "express";
import { userLogin,userRegister } from "../controllers/user";

const userRouter: Router = Router();
// Routes

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User Login
 *     description: Log in a user by providing email and password.
 *     tags:
 *      - User
 *     parameters:
 *       - in: body
 *         name: requestBody
 *         description: Request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Email of the user.
 *             password:
 *               type: string
 *               description: User password.
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: './modelw//User.ts'  # Replace with the actual schema reference for a user
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Bad request. Invalid user data.
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

userRouter.post("/login",userLogin);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details.
 *     tags:
 *      - User
 *     parameters:
 *       - in: body
 *         name: requestBody
 *         description: Request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: Username of the user.
 *             email:
 *               type: string
 *               description: Email of the user.
 *             password:
 *               type: string
 *               description: User password.
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: './models/User.ts'
 *                 token:
 *                   type: string
 *               example:
 *                 user:
 *                   _id: "605c72a31c2e8c1f8872fb6b"
 *                   uname: JohnDoe
 *                   uemail: john@example.com
 *                 token: "jwt_token_here"
 *       400:
 *         description: Bad request or user already exists
 *       500:
 *         description: Internal server error
 */

userRouter.post("/register", userRegister);


export { userRouter }
