const Blog = require('../models/Blog')


exports.createBlog = async (req, res) => {
    try {
        const result = await Blog.create(req.body)
        res.status(201).json({
            success: true,
            blog: result
        })

    } catch (error) {
        res.status(400).json(
            {
                success: false,
                message: error.message,
                error
            }
        )
    }
}

exports.getAllBlogs = async (req, res) => {
    try {
        const result = await Blog.find();
        res.status(200).json({
            success: true,
            count: result.length,
            blogs: result
        })
    } catch (error) {
        res.status(400).json(
            {
                success: false,
                message: error.message,
                error
            }
        )
    }
}

// blogs/:id
exports.getSingleBlog = async(req, res) => {
    try {
        const result = await Blog.findById(req.params.id);
        if(!result) {
            res.status(404).json({
                success: false,
                message: "Blog not found" 
            })
        }

        res.status(200).json({
            success: true,
            blog: result
        })

    } catch (error) {
        res.status(400).json(
            {
                success: false,
                message: error.message,
                error
            }
        )
    }
}


exports.updateBlog = async (req, res) => {
    try {
        let result = await Blog.findById(req.params.id);
        if(!result) {
            res.status(404).json({
                success: false,
                message: "Blog not found" 
            })
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

    } catch (error) {
        res.status(400).json(
            {
                success: false,
                message: error.message,
                error
            }
        )
    }
}

exports.deleteBlog = async(req, res) => {
    try {
        let result = await Blog.findById(req.params.id);
        if(!result) {
            res.status(404).json({
                success: false,
                message: "Blog not found" 
            })
        }

        result = await Blog.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "Blog was deleted",
            blog: result
        })
        
    } catch (error) {
        res.status(400).json(
            {
                success: false,
                message: error.message,
                error
            }
        )
    }
}
