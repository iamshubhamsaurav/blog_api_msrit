const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB Server");
}

module.exports = connectDB