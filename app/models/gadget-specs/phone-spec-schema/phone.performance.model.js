const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let PhonePerformanceSchema = new Schema({
    CPU: {
        type: String,
        trim: true
    },
    coreCount: {
        type: String,
        trim: true
    },
    clockSpeed: {
        type: String,
        trim: true
    },
    GPU: {
        type: String,
        trim: true
    },
    others: {
        type: String,
        trim: true
    }
})

mongoose.model('PhonePerformance', PhonePerformanceSchema);