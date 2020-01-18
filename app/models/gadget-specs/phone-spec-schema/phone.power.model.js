const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let PhonePowerSchema = new Schema({
    capacity: {
        type: String,
        trim: true
    },
    batteryTech: {
        type: String,
        trim: true
    },
    charging: {
        type: String,
        trim: true
    },
    port: {
        type: String,
        trim: true
    },
    others: {
        type: String,
        trim: true
    }
})

mongoose.model('PhonePower', PhonePowerSchema);