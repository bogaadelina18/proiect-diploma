const mongoose = require('mongoose');
const { Schema } = mongoose;

const WQSchema = new Schema({
    text : String,

    counter: { type: Number, default: 1 }
});

mongoose.model('WQ', WQSchema );