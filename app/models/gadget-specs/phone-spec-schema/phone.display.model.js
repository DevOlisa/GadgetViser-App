const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let PhoneDisplaySchema = new Schema({
    tech: {
        type: String,
        trim: true
    },
    size: {
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
});

mongoose.model('PhoneDisplay', PhoneDisplaySchema);