const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, "Please provide a title for the blog"],
        minLength: [5, "Title cannot be less than 5 characters"],
        maxLength: [512, "Title cannot be more than 512 characters"]
    },
    body: {
        type: String,
        required: [true, "Please provide body for the blog"],
        minLength: [512, "Body cannot be less than 512 characters"],
    },
    likes: {
        type: Number,
        default: 0,
        required: [true, "Likes cannot be empty"],
    },
    status: {
        type: String,
        enum: ["public", "private"],
        default: "private"
    },
    hashtag: {
        type: String
    }
}, {
    timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog