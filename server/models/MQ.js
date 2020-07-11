const mongoose = require('mongoose');
const { Schema } = mongoose;

const MQSchema = new Schema({
    text : String,

    counter: { type: Number, default: 1 }
});

mongoose.model('MQ', MQSchema );