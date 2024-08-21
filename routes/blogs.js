const express = require('express')

const {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogs')

const router = express.Router()

router
    .route('/')
    .post(createBlog)
    .get(getAllBlogs)
    
// /blogs/232frdf
router
    .route('/:id')
    .get(getSingleBlog)
    .put(updateBlog)
    .delete(deleteBlog)


module.exports = router