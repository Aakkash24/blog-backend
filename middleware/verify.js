"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const verify = (req, res, next) => {
    console.log("Inside verify");
    if (!req.headers.authorization) {
        return res.status(403).json({ msg: "Not authorized" });
    }
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, data) => {
            if (err)
                return res.status(403).json({ msg: "Token expired" });
            res.user = data;
            next();
        });
    }
};
exports.default = verify;
