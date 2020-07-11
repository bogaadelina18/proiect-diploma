const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const offersSchema = new mongoose.Schema({
    address: {
        type : String
    },
    hotel: String,
    price : String,
    details : String, 
    counter: { 
        type: Number, 
        default: 1 
    }
})



mongoose.model('Offers', offersSchema);