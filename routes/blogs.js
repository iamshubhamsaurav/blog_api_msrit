const express = require('express')

const {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogs')

const router = express.Router({ mergeParams: true })
// base urls
// /categories/:categoryId/blogs/
// /blogs/


router
    .route('/')
    .post(createBlog)
    .get(getAllBlogs)
    
// /blogs/232frdf
// /categories/:categoryId/blogs/dhkgjik3
router
    .route('/:id')
    .get(getSingleBlog)
    .put(updateBlog)
    .delete(deleteBlog)


module.exports = router