import Blog from "../models/Blog"
import { Request,Response } from "express"
import Image from "../models/Image";

const uploadImg = require("../cloudinary/cloudinary.js")
const getAll = async(req:Request,res:Response) => {
    try {
        const blogs = await Blog.find({}).populate("uid","-upassword");
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const findBlog = async(req:Request,res:Response) => {
    try {
        const blog:any = await Blog.findById(req.params.id).populate("uid","-upassword");
        await blog.save();
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findImg = async(req:Request,res:Response) => {
    try {
        const img:any = await Image.findById(req.params.id);
        return res.status(200).json(img);
    } catch (error) {
        return res.status(400).json(error)
    }
}

const featuredBlog = async(req:Request,res:Response) => {
    try {
        const blog = await Blog.find({featured:true}).populate("uid","-upassword").limit(3);
        return res.status(200).json(blog);
    } catch (error) {
        res.status(400).json(error);
    }
}


const updateBlogViews = async(req:Request,res:Response)=>{
    try {
        const blog:any = await Blog.findById(req.params.id);
        blog.bviews += 1;
        await blog.save();
        res.status(200).json({msg:"Blog View updated"})
    } catch (error) {
        res.status(400).json(error);
    }
}

const uploadImage = async(req:any,res:any) => {
    uploadImg(req.body.image)
    .then((url:any)=>{res.send({url:url})})
    .catch((err:any)=>console.log(err))
}

const createBlog = async(req:any,res:any) => {
    try {
        console.log("Inside Creation");
        console.log(res.user);
        const btitle = req.body.title;
        const bdesc = req.body.desc;
        const bcat = req.body.category;
        const bphoto = req.body.photo;
        console.log(bphoto);
        const blog = await Blog.create({btitle:btitle,bdesc:bdesc,bcat:bcat,bphoto:bphoto,uid:res.user.id});
        console.log(blog);
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(400).json(error); 
    }
}

const updateBlog = async(req:any,res:any) => {
    try {
        console.log("Update called")
        const blog:any = await Blog.findById(req.params.id);
        if(blog.uid.toString() !== res.user.id){
            throw new Error("Update only own post")
        }
        const btitle = req.body.title;
        const bdesc = req.body.desc;
        const bcat = req.body.category;
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,{$set:{btitle:btitle,bdesc:bdesc,bcat:bcat}},{new:true}).populate("uid","-upassword")
        return res.status(200).json(updatedBlog)

    } catch (error) {
        console.log("Update error")
        return res.status(400).json(error);
    }
}

const likeBlog = async(req:any,res:any) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if(blog?.blikes.includes(res.user.id)){
            blog.blikes = blog.blikes.filter((uid)=> uid!== res.user.id);
            await blog.save();
            return res.status(200).json({msg:"Blog unliked successfully"});
        }
        blog?.blikes.push(res.user.id);
        await blog?.save();
        return res.status(200).json({msg:"Blog liked successfully"})
    } catch (error) {
        return res.status(400).json(error);
    }
}

const deleteBlog = async(req:any,res:any)=>{
    try {
        const blog:any = await Blog.findById(req.params.id.toString());
        if(blog?.uid.toString() !== res.user.id){
            throw new Error("Deletion can be done only to your post");
        }
        await Blog.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg:"Blog deleted successfully"});
    } catch (error) {
        return res.status(400).json(error);
    }
}

export {getAll,findBlog,featuredBlog,createBlog,updateBlog,likeBlog,deleteBlog,updateBlogViews,findImg,uploadImage};