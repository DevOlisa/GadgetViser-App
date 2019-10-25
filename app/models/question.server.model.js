const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    answered: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: Array
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
    shares: {
        type: Number,
        default: 0
    },
    answers: [{
        type: Schema.ObjectId,
        ref: 'Answer'
    }],
    follows: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
});

mongoose.model('Question', QuestionSchema);