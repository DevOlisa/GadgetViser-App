const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let PhoneAudioSchema = new Schema({
    stereoSpeakers: {
        type: Boolean,
    },
    audioPort: {
        type: String,
        trim: true
    },
    DAC: {
        type: String,
        trim: true
    },
    mics: {
        type: Number,
        trim: true
    },
    others: {
        type: String,
        trim: true
    }
})

mongoose.model('PhoneAudio', PhoneAudioSchema);