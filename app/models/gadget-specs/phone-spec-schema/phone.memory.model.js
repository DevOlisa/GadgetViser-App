const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let PhoneMemorySchema = new Schema({
    storage: {
        type: String,
        trim: true
    },
    memory: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    microSD: {
        type: String,
        trim: true
    },
    others: {
        type: String,
        trim: true
    }
})

mongoose.model('PhoneMemory', PhoneMemorySchema);