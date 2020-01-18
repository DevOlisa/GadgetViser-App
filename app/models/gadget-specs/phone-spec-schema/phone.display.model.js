const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let PhoneDisplaySchema = new Schema({
    displayTech: {
        type: String,
        trim: true
    },
    displaySize: {
        type: String,
        trim: true
    },
    resolution: {
        type: String,
        trim: true
    },
    refreshRate: {
        type: String,
        trim: true
    },
    aspectRatio: {
        type: String,
        trim: true
    },
    others: {
        type: String,
        trim: true
    }
})

mongoose.model('PhoneDisplay', PhoneDisplaySchema);