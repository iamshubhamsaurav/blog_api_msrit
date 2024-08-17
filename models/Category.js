const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name for the category"],
        unique: true,
        // unique: [true, "Please provide a unique value for name"]
        // default: "Some default name",
        // minLength: 12
        minLength: [3, "Name cannot be less than 5 characters"],
        maxLength: [32, "Name cannot be more than 8 characters"]
    },
    description: {
        type: String,
        // required: true
        required: [true, "Please provide description"]
    },
    // dummy: {
    //     type: Number,
    //     required: true,
    //     default: 0,
    //     min: [1, "Value cannot be less than 1"],
    //     max: [5, "Value cannot be mpore than 5"]
    // }
},
{ timestamps: true })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category