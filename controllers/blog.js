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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.findImg = exports.updateBlogViews = exports.deleteBlog = exports.likeBlog = exports.updateBlog = exports.createBlog = exports.featuredBlog = exports.findBlog = exports.getAll = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const Image_1 = __importDefault(require("../models/Image"));
const uploadImg = require("../cloudinary/cloudinary.js");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog_1.default.find({}).populate("uid", "-upassword");
        return res.status(200).json(blogs);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getAll = getAll;
const findBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findById(req.params.id).populate("uid", "-upassword");
        yield blog.save();
        return res.status(200).json(blog);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.findBlog = findBlog;
const findImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const img = yield Image_1.default.findById(req.params.id);
        return res.status(200).json(img);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.findImg = findImg;
const featuredBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.find({ featured: true }).populate("uid", "-upassword").limit(3);
        return res.status(200).json(blog);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.featuredBlog = featuredBlog;
const updateBlogViews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findById(req.params.id);
        blog.bviews += 1;
        yield blog.save();
        res.status(200).json({ msg: "Blog View updated" });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.updateBlogViews = updateBlogViews;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    uploadImg(req.body.image)
        .then((url) => { res.send({ url: url }); })
        .catch((err) => console.log(err));
});
exports.uploadImage = uploadImage;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Inside Creation");
        console.log(res.user);
        const btitle = req.body.title;
        const bdesc = req.body.desc;
        const bcat = req.body.category;
        const bphoto = req.body.photo;
        console.log(bphoto);
        const blog = yield Blog_1.default.create({ btitle: btitle, bdesc: bdesc, bcat: bcat, bphoto: bphoto, uid: res.user.id });
        console.log(blog);
        return res.status(200).json(blog);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Update called");
        const blog = yield Blog_1.default.findById(req.params.id);
        if (blog.uid.toString() !== res.user.id) {
            throw new Error("Update only own post");
        }
        const btitle = req.body.title;
        const bdesc = req.body.desc;
        const bcat = req.body.category;
        const updatedBlog = yield Blog_1.default.findByIdAndUpdate(req.params.id, { $set: { btitle: btitle, bdesc: bdesc, bcat: bcat } }, { new: true }).populate("uid", "-upassword");
        return res.status(200).json(updatedBlog);
    }
    catch (error) {
        console.log("Update error");
        return res.status(400).json(error);
    }
});
exports.updateBlog = updateBlog;
const likeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findById(req.params.id);
        if (blog === null || blog === void 0 ? void 0 : blog.blikes.includes(res.user.id)) {
            blog.blikes = blog.blikes.filter((uid) => uid !== res.user.id);
            yield blog.save();
            return res.status(200).json({ msg: "Blog unliked successfully" });
        }
        blog === null || blog === void 0 ? void 0 : blog.blikes.push(res.user.id);
        yield (blog === null || blog === void 0 ? void 0 : blog.save());
        return res.status(200).json({ msg: "Blog liked successfully" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.likeBlog = likeBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findById(req.params.id.toString());
        if ((blog === null || blog === void 0 ? void 0 : blog.uid.toString()) !== res.user.id) {
            throw new Error("Deletion can be done only to your post");
        }
        yield Blog_1.default.findByIdAndDelete(req.params.id);
        return res.status(200).json({ msg: "Blog deleted successfully" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.deleteBlog = deleteBlog;
