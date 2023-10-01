import { Router } from "express";
import { findImg,findBlog, getAll, uploadImage,featuredBlog, createBlog, updateBlog,likeBlog,deleteBlog,updateBlogViews } from "../controllers/blog";
import verify from "../middleware/verify";

const blogRouter:Router = Router();

/**
 * @swagger
 * /blog/getAll:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve a list of all blogs.
 *     tags:
 *       - Blog
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/Blog'  
 *       400:
 *         description: Bad request. Unable to retrieve blogs.
 *       500:
 *         description: Internal server error
 */
blogRouter.get("/getAll",getAll);


/**
 * @swagger
 * /blog/find/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     description: Get a blog by its unique identifier.
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: A blog object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 uid:
 *                   type: string
 *               required:
 *                 - _id
 *                 - title
 *                 - content
 *                 - uid
 *       404:
 *         description: Blog not found
 *       400:
 *         description: Bad request. Invalid blog ID format.
 *       500:
 *         description: Internal server error
 */
blogRouter.get("/find/:id",findBlog);
blogRouter.get("/findImg/:id",findImg);


/**
 * @swagger
 * /blog/featured:
 *   get:
 *     summary: Get featured blogs
 *     description: Get a list of featured blogs
 *     tags:
 *       - Blog
 *     responses:
 *       200:
 *         description: A list of featured blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/Blog'  
 *       400:
 *         description: Bad request. An error occurred while fetching featured blogs.
 *       500:
 *         description: Internal server error
 */

blogRouter.get("/featured",featuredBlog);


/**
 * @swagger
 * /blog/updateViews/{id}:
 *   get:
 *     summary: Update blog views
 *     description: Update the view count of a blog by its ID.
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog view count updated successfully
 *       400:
 *         description: Bad request. Invalid blog ID or other error.
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
blogRouter.get("/updateViews/:id",updateBlogViews);

/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new blog
 *     description: Create a new blog.
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: body
 *         name: requestBody
 *         description: Request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: Blog title.
 *             desc:
 *               type: string
 *               description: Blog description.
 *             category:
 *               type: string
 *               description: Blog Category.
 *             photo:
 *               type: string
 *               description: Blog photo.
 *             required:
 *               - title
 *               - desc
 *               - category
 *               - photo
 *     responses:
 *       200:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 category:
 *                   type: string
 *                 photo:
 *                   type: string
 *               required:
 *                 - title
 *                 - desc
 *                 - category
 *                 - photo
 *       400:
 *         description: Bad request. Invalid blog data.
 *       500:
 *         description: Internal server error
 */
blogRouter.post("/",verify,createBlog);
blogRouter.post("/uploadImage",uploadImage);

/**
 * @swagger
 * /blog/updateBlog/{id}:
 *   put:
 *     summary: Update a blog post
 *     description: Update a blog post with the specified ID.
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID to update
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication
 *       - in: body
 *         name: requestBody
 *         description: Request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: Blog title.
 *             desc:
 *               type: string
 *               description: Blog description.
 *             category:
 *               type: string
 *               description: Blog Category.
 *     requestBody:
 *       description: Updated blog post object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               category:
 *                 type: string
 *             example:
 *               title: New Title
 *               desc: New Description
 *               category: New Category
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/Blog'  
 *       400:
 *         description: Bad request. Invalid blog post data.
 *       403:
 *         description: Forbidden. Not authorized to update this blog post.
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */

blogRouter.put("/updateBlog/:id",verify,updateBlog);

/**
 * @swagger
 * /blog/likeBlog/{id}:
 *   put:
 *     summary: Like or unlike a blog
 *     description: Like or unlike a blog by its ID.
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog liked/unliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request or error in liking/unliking the blog
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

blogRouter.put("/likeBlog/:id",verify,likeBlog);

/**
 * @swagger
 * /blog/{id}:
 *   PUT:
 *     summary: Delete a blog by ID
 *     description: Delete a blog by its ID. Only the owner of the blog can perform this action.
 *     tags:
 *      - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID to delete
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       400:
 *         description: Bad request. Invalid blog ID.
 *       403:
 *         description: Forbidden. Deletion can only be done by the owner of the blog.
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

blogRouter.put("/deleteBlog/:id",verify,deleteBlog);

export {blogRouter};