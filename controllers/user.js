"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = exports.userLogin = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existing = yield User_1.default.findOne({ uemail: req.body.email });
        if (existing) {
            console.log("User already exists");
            return res.status(400);
        }
        const username = req.body.username;
        const uemail = req.body.email;
        var upassword = req.body.password;
        if (username == '' || uemail == '' || upassword == '')
            return res.status(400).json({ msg: "Enter the details" });
        const hash = yield bcrypt.hash(upassword, 10);
        const newUser = yield User_1.default.create({ uname: username, uemail: uemail, upassword: hash });
        var _a = newUser._doc, { upassword } = _a, other = __rest(_a, ["upassword"]);
        const token = yield jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: "1h" });
        console.log("Created successfully");
        return res.status(200).json({ user: other, token });
    }
    catch (error) {
        console.log("Error");
        return res.status(400).json(error);
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uemail = req.body.email;
        var upassword = req.body.password;
        const existing = yield User_1.default.findOne({ uemail: uemail });
        if (!existing) {
            throw new Error("User already existed");
        }
        const flag = bcrypt.compare(req.body.password, existing.upassword);
        if (!flag) {
            throw new Error("Invalid credentials");
        }
        var _b = existing._doc, { upassword } = _b, other = __rest(_b, ["upassword"]);
        const token = yield jwt.sign({ id: existing._id }, process.env.SECRET, { expiresIn: "1h" });
        return res.status(200).json({ user: other, token });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.userLogin = userLogin;
