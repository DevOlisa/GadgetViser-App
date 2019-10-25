const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String,
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    },
    published: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        enum: ["phone", "laptop", "tablet", "smartwatch"],
        default: "phone"
    },
    likes: {
        type: []
    },
    likeCount: {
        type: Number,
        default: 0
    }
});

mongoose.model('Article', ArticleSchema);