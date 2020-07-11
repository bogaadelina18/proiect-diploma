const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const agencySchema = new mongoose.Schema({
    name: {
        type : String
    },
    addres: String,
    email : String,
    tel : String, 
    counter: { 
        type: Number, 
        default: 1 
    }
})



mongoose.model('Agency', agencySchema);