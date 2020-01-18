const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let PhoneSoftwareSchema = new Schema({
    OS: {
        type: String,
        trim: true
    },
    version: {
        type: String,
        trim: true
    },
    upgradable: {
        type: String,
        trim: true
    },
    others: {
        type: String,
        trim: true
    }
})

mongoose.model('PhoneSoftware', PhoneSoftwareSchema);