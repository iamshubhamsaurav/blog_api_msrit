const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: String,
    description: String
},
{ timestamps: true })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category