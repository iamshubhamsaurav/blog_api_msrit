
const Category = require('../models/Category')
const Blog = require('../models/Blog')

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


exports.createCategory = async (req, res) => {
    try {
        const cat = await Category.create(req.body)
        res.status(201).json({
            success: true,
            category: cat
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }    
}


exports.getAllCategories = async(req, res) => {

    try {
        const categories = await Category.find()
        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}

// /categories/:id

// /categories/1dnjfjkj
exports.getSingleCategory = async(req, res) => {
    try {
        const result = await Category.findById(req.params.id)

        if(!result) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            category: result
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}

exports.deleteCategory = async(req, res) => {
    
    try {
        let result;
        
        result = await Category.findById(req.params.id)

        if(!result) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
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
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong!",
            error: error
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let result;

        result = await Category.findById(req.params.id)

        if(!result) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
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
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong!",
            error: error
        })
    }
}