const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
const bookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        default: "",
    },
    author: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: "defaultCover.png",
    },
    chapters: [chapterSchema],
    status:{
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
},
{ timestamps: true }
);
module.exports = mongoose.model("Book", bookSchema);