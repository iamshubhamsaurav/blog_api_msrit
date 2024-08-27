const express = require('express')
const connectDB = require('./db')
const morgan = require('morgan')


// const Category = require('./models/Category')


connectDB()

const app = express()

const categoryRoute = require('./routes/categories')
const blogRoute = require('./routes/blogs')


const errorHandler = require('./middleware/errorHandler')


app.use(morgan('dev'))

// allows our app to read the body of the request
app.use(express.json())


// /categories is the base url

app.use('/categories', categoryRoute)
app.use('/blogs', blogRoute)

app.use(errorHandler)

// --   /categories/
// --   /categories/kdhfkjdshkjfhk


// app.post('/categories', async (req, res) => {
//     try {
//         const cat = await Category.create(req.body)
//         res.status(201).json({
//             success: true,
//             category: cat
//         })
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "Something went wrong",
//             error: error
//         })
//     }    
// })


// app.get('/categories', async(req, res) => {

//     try {
//         const categories = await Category.find()
//         res.status(200).json({
//             success: true,
//             count: categories.length,
//             categories
//         })

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "Something went wrong",
//             error: error
//         })
//     }
// })








const PORT = 4000
app.listen(PORT, () => {
    console.log("Listening to server on port 4000");  
})