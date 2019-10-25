const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Boolean,
        default: false
    },
    isBestAnswer: {
        type: Boolean,
        default: false
    }
});

mongoose.model('Answer', AnswerSchema);