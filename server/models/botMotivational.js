const mongoose = require('mongoose');
const { Schema } = mongoose;

const botMotivationalSchema = new Schema({
    text : String,
    counter: { type: Number, default: 1 }
});

mongoose.model('botMotivational', botMotivationalSchema);