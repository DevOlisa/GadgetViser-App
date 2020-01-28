const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let PhoneAudioSchema = new Schema({
    stereoSpeakers: {
        type: String,
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
        type: String,
        trim: true
    },
    others: {
        type: String,
        trim: true
    }
})

mongoose.model('PhoneAudio', PhoneAudioSchema);