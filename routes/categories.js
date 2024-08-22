const express = require('express')

const blogRoute = require('./blogs')

const router = express.Router()

// const categoryController = require('../controllers/categories')
const {
    getAllCategories, 
    createCategory, 
    getSingleCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories')

// /categories/:categoryId/blogs
router.use('/:categoryId/blogs', blogRoute)


// /categories
router.get("/", getAllCategories)

// /categories/1
router.post("/", createCategory)

router.get("/:id", getSingleCategory)

router.delete('/:id', deleteCategory)

router.put('/:id', updateCategory)

module.exports = router

