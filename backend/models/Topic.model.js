const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'users', required: true },
    topic: { type: String, required: [true, "Please enter the Topic of the blog"] },
    description: [
        {
            category: { type: String },
            content: { type: String },
        }
    ],
    score: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("topics", TopicSchema);