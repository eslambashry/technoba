import { BlogsModel } from '../../DB/models/blogsModel.js';
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 5)
import CustomError from "../../utilities/customError.js"
import imagekit from '../../utilities/imagekitConfigration.js';

export const createBlog = async (req, res, next) => {
    // console.log(req.body);
    
    const { title_ar, title_en, content_ar, content_en } = req.body;
 
    if (!title_ar || !title_en || !content_ar || !content_en) {
        return next(new CustomError("Title and content are required", 400));
    }

    const imageFiles = req.files || [];
    if (imageFiles.length === 0) {
        return next(new CustomError("At least one image is required", 400));
    }

  const customId = nanoid();
  const uploadedImages = [];

    // Upload image to ImageKit
    for (const file of req.files) {
      const uploadResult = await imagekit.upload({
        file: file.buffer, 
        fileName: file.originalname,
        folder: `${process.env.PROJECT_FOLDER}/Blogs/${customId}`,
      });

      uploadedImages.push({
        imageLink: uploadResult.url,
        public_id: uploadResult.fileId,
      });
    }

    const newBlog = new BlogsModel({
      title: {
        ar: title_ar,
        en: title_en
      },
      content: {
        ar: content_ar,
        en: content_en
      },
        customId,
        image: uploadedImages,
    });

    await newBlog.save();

    return res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog: newBlog
    });
}

export const getAllBlogs = async (req, res, next) => {
    const blogs = await BlogsModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
        success: true,
        blogs
    });
}

export const getOneBlogs = async (req, res, next) => {
    const id = req.params.id

    const blog = await BlogsModel.findById(id)
    return res.status(200).json({
        success: true,
        blog
    });
}

export const updateBlog = async (req, res, next) => {

    const { title_ar, title_en, content_ar, content_en } = req.body;
    const id = req.params.id;
    
    const blog = await BlogsModel.findById(id);
    if (!blog) {
        return next(new CustomError("Blog not found", 404));
    }

    if (title_ar) blog.title.ar = title_ar;
    if (title_en) blog.title.en = title_en;
    if (content_ar) blog.content.ar = content_ar;
    if (content_en) blog.content.en = content_en;

    if (req.files && req.files.length > 0) {
        // Delete old images from ImageKit
        for (const img of blog.image) {
            await imagekit.deleteFile(img.public_id);
        }   
        const uploadedImages = [];
        // Upload new images to ImageKit
        for (const file of req.files) {
          const uploadResult = await imagekit.upload({  
            file: file.buffer, 
            fileName: file.originalname,
            folder: `${process.env.PROJECT_FOLDER}/Blogs/${blog.customId}`,
          });
            uploadedImages.push({
            imageLink: uploadResult.url,
            public_id: uploadResult.fileId,
          });
        }
        blog.image = uploadedImages;
    }
    await blog.save();

    return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        blog
    });
}

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    const blog = await BlogsModel.findById(id);
    if (!blog) {
        return next(new CustomError("Blog not found", 404));
    }   
    // Delete images from ImageKit
    for (const img of blog.image) {
        await imagekit.deleteFile(img.public_id);
    }   
    await BlogsModel.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Blog deleted successfully"
    });
}