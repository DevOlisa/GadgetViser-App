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
    gadget: {
        type: Schema.ObjectId,
        ref: 'Gadget',
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
        default: 14
    },
    downvotes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 407
    },
    shares: {
        type: Number,
        default: 54
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