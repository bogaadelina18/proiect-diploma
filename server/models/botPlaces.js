const mongoose = require('mongoose');
const { Schema } = mongoose;

const botPlacesSchema = new Schema({
    text : String,
    counter: { type: Number, default: 1 }
});

mongoose.model('botPlaces', botPlacesSchema);