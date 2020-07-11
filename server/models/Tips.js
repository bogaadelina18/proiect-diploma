const mongoose = require('mongoose');

const tipsSchema = new mongoose.Schema({
    location: {
        type : String
    },
    text :{
        type: String
    },

    canonicalUrl :{
        type: String
    },
    agreeCount :{
        type : Number
    },
    disagreeCount :{
        type : Number
    },
    userFirstName: { 
        type: String
        
    },
    userLastName: { 
        type: String
        
    }
})

mongoose.model('Tips', tipsSchema);