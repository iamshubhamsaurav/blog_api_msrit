
const Category = require('../models/Category')
const Blog = require('../models/Blog')
const AppError = require('../utils/AppError')

const asyncHandler = require('../middleware/asyncHandler')


// // real world use of middleware

// exports.checkIfCategoryExists = async (req, res, next) => {
//     console.log("checkIfCategoryExists called");
    
//     const category = await Category.findById(req.params.id)

//     if(!category) {
//         console.log("Catgory not found -- in checkIfCategoryExists");
        
//         return res.status(404).json({
//             success: false,
//             message: "Category not found"
//         })
//     }

//     // category found
//     req.data = category
//     next()


// }


// module.exports = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch(next);
//     }
// }

exports.createCategory = asyncHandler(async (req, res, next) => {
        const cat = await Category.create(req.body)
        res.status(201).json({
            success: true,
            category: cat
        })
})


exports.getAllCategories = asyncHandler(async(req, res, next) => {
        const categories = await Category.find()
        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        })
})

// /categories/:id

// /categories/1dnjfjkj
exports.getSingleCategory = asyncHandler(async(req, res, next) => {

        const result = await Category.findById(req.params.id)

        if(!result) {
           return next(new AppError(404, 'Category not found'))
        }

        res.status(200).json({
            success: true,
            category: result
        })

})

exports.deleteCategory = asyncHandler(async(req, res, next) => {
        let result;
        
        result = await Category.findById(req.params.id)

        if(!result) {            
            return next(new AppError(404, "Category not found"))
        }

        // result is the category and it has the  id
        // cascade delete 
        // we should delete all the child blogs of this category first
        await Blog.deleteMany({ categoryId: result._id })

        result = await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message:  `Category with the ${req.params.id} was deleted`,
            category: result
        })
  
})

exports.updateCategory = asyncHandler(async (req, res, next) => {
        let result;

        result = await Category.findById(req.params.id)

        if(!result) {
            return next(new AppError(404, "Category not found"))
        }

        result = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                runValidators: true,
                new: true
            }
        )

        res.status(200).json({
            success: true,
            category: result
        })
        

})