const mongoose = require('mongoose');
const { Schema } = mongoose;

const botWeatherSchema = new Schema({
    text : String,
    counter: { type: Number, default: 1 }
});

mongoose.model('botWeather', botWeatherSchema);