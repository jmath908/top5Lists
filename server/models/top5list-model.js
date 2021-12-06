const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = new mongoose.Schema({
    username: String,
    comment: Number
});



const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String },
        username: {type: String, required: true},
        likes: {type: Number},
        dislikes: {type: Number},
        views: {type: Number},
        comments: {type: [[String]]},
        published: {type: Boolean},
        comment: {type:[[commentSchema]]}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
