const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = new mongoose.Schema({
    username: String,
    comment: String
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
        comments: {type:[commentSchema]},
        published: {type: Boolean},
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
