const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define the Gadget Schema
let GadgetSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    oem: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true,
        default: "./img/phone_pics/phone.jpg"
    },
    type: {
        type: String,
        enum: ["Phone", "Laptop", "Smartwatch", "Tablet", "TV"],
        default: "Phone"
    },
    category: [],
    link: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    availabilty: {
        type: String,
        default: 'Yes'
    },
    added: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    // specs: []
    questions: [{
        type: Schema.ObjectId,
        ref: 'Question'
    }]
}, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

// Add Static Methods
GadgetSchema.statics.findOneByName = function(name, callback) {
    this.findOne({name: new RegExp(name, 'i')}, callback);
};

//********  Middleware functions**********//
// Pre Save Middleware

// Post Save Middleware
GadgetSchema.post('save', function (next) {
    if (this.isNew) {
        console.log('A new gadget was sucessfully created');
        console.log(isNew);
    } else {
        console.log('A gadget info was updated');
    }
});

mongoose.model('Gadget', GadgetSchema);