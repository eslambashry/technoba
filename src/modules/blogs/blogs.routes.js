import { Router } from "express";
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utilities/allowedExtensions.js";
import * as BlogCon from "./blogs.controller.js";

const blogsRouter = Router();

blogsRouter.post('/add', multerCloudFunction(allowedExtensions.Image).array("image", 5),BlogCon.createBlog)
blogsRouter.get('/',BlogCon.getAllBlogs)
blogsRouter.get('/:id',BlogCon.getOneBlogs)
blogsRouter.put('/:id',multerCloudFunction(allowedExtensions.Image).array("image", 5),BlogCon.updateBlog)
blogsRouter.delete('/:id',BlogCon.deleteBlog)

export default blogsRouter;
