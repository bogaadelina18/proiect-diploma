const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    
    name: {
        type : String
    },
    address :{
        type: String
    },
    city : {
        type :String
    },
    state : {
        type :String
    },
    country : {
        type :String
    },
    lat :{
        type : Number
    },
    lng :{
        type : Number
    },
    categories:{
        type: String
    },
    rating:{
        type :Number
    },
    counter: { 
        type: Number, 
        default: 1 
    }
})

mongoose.model('Places', placeSchema);