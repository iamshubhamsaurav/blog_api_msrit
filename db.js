const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/blog_api_msrit');
    console.log("Connected to MongoDB Server");
}

module.exports = connectDB