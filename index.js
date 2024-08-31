const express = require('express')
const connectDB = require('./db')
const morgan = require('morgan')

const dotenv = require('dotenv')
dotenv.config() // load env to the server

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

// /api/categories
// /api/v1/categories
// /api/v3/categories
app.use('/api/categories', categoryRoute)
app.use('/api/blogs', blogRoute)

app.use(errorHandler)

// handle generic 404 page not found here
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Page Not Found!"
    })
})

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








const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening to server on port ${PORT}`);  
})