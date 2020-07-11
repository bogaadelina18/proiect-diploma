const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const transportSchema = new mongoose.Schema({
    description: {
        type : String
    },
    price: String,
    period : String,
    cityFrom : String, 
    cityTo : String,
    counter: { 
        type: Number, 
        default: 1 
    }
})



mongoose.model('Transport', transportSchema);