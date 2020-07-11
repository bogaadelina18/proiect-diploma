const mongoose = require('mongoose');
const { Schema } = mongoose;

const TQSchema = new Schema({
    text : String,

    counter: { type: Number, default: 1 }
});

mongoose.model('TQ', TQSchema );