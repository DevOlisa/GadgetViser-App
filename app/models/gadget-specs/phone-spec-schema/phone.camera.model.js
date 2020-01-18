const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let PhoneCameraSchema = new Schema({
    type: {
        type: String,
        trim: true
    },
    main: {
        type: Boolean,
    },
    resolution: {
        type: String,
        trim: true
    },
    focalLength: {
        type: String,
        trim: true
    },
    stabilization: {
        type: String,
        trim: true
    },
    video: {
        type: String,
        trim: true
    },
    others: {
        type: String,
        trim: true
    }
})

mongoose.model('PhoneCamera', PhoneCameraSchema);