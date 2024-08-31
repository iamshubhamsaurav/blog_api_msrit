const Blog = require('../models/Blog')
const Category = require('../models/Category')
const AppError = require('../utils/AppError')
const asyncHandler = require('../middleware/asyncHandler')

// /categories/:categoryId/blogs
exports.createBlog = asyncHandler(async (req, res, next) => {
    
    const category = await Category.findById(req.params.categoryId)

    if (!category) {
        return next(new AppError(404, 'Category not found'))
    }

    req.body.categoryId = category._id;

    const result = await Blog.create(req.body)
    res.status(201).json({
        success: true,
        blog: result
    })
})

// /blogs
// /categories/:categoryId/blogs
exports.getAllBlogs = asyncHandler(async (req, res, next) => {

    let result;

    if (req.params.categoryId) {
        result = await Blog.find({ categoryId: req.params.categoryId })
    } else {
        // fetch all blogs
        result = await Blog.find()
    }

    res.status(200).json({
        success: true,
        count: result.length,
        blogs: result
    })
})

// blogs/:id
exports.getSingleBlog = asyncHandler(async (req, res, next) => {
    try {
        const result = await Blog.findById(req.params.id);
        console.log(result);

        if (!result) {
            return next(new AppError(404, "Blog not found"))
        }

        res.status(200).json({
            success: true,
            blog: result
        })

    } catch (error) {
        next(error)
    }
})


exports.updateBlog = asyncHandler(async (req, res, next) => {

    let result = await Blog.findById(req.params.id);
    if (!result) {
        return next(new AppError(404, "Blog not found"))
    }

    result = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    res.status(200).json({
        success: true,
        message: "Blog was updated",
        blog: result
    })


})

exports.deleteBlog = asyncHandler(async (req, res, next) => {

    let result = await Blog.findById(req.params.id);
    if (!result) {
        return next(new AppError(404, "Blog not found"))
    }

    result = await Blog.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Blog was deleted",
        blog: result
    })

})
