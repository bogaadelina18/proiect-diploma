const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const botsSchema = new mongoose.Schema({
    name: {
        type : String
    },
    counter: { 
        type: Number, 
        default: 1 
    }
})



mongoose.model('Bots', botsSchema);