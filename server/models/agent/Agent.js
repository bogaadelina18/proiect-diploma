const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const agentSchema = new mongoose.Schema({
    description: {
        type : String
    },
    language:{
        type:String
    },
    googleAssistant:{
        type:Array
    },
    webhook:{
        type:Array
    },

    counter: { 
        type: Number, 
        default: 1 
    }
})

module.exports = mongoose.model('Agent', agentSchema);




var entitiesSchema = new Schema({
    name: String,
    Agent:[
      {type: Schema.Types.ObjectId, ref: 'Agent'}
    ]
});

module.exports = mongoose.model('Entities', entitiesSchema);

var intentsSchema = new Schema({
    name: String,
    priority : Number,
    fallbackIntents : Boolean,
    Agent:[
      {type: Schema.Types.ObjectId, ref: 'Agent'}
    ]
});

module.exports = mongoose.model('Intents', intentsSchema);

var actionSchema = new Schema({
    name: String,
    parameters : Array,

    Intents:[
      {type: Schema.Types.ObjectId, ref: 'Intents'}
    ]
});

module.exports = mongoose.model('Action', actionSchema);

var trainingPhrasesSchema = new Schema({
    text: String,
 

    Intents:[
      {type: Schema.Types.ObjectId, ref: 'Intents'}
    ]
});

module.exports = mongoose.model('trainingPhrases', trainingPhrasesSchema);

var responsesPhrasesSchema = new Schema({
    parameters: Array,
 

    Intents:[
      {type: Schema.Types.ObjectId, ref: 'Intents'}
    ]
});

module.exports = mongoose.model('Responses', responsesSchema);

var messagesPhrasesSchema = new Schema({
    type: String,
    lang : String,
    speech: Array,

    Responses:[
      {type: Schema.Types.ObjectId, ref: 'Responses'}
    ]
});

module.exports = mongoose.model('Messages', responseSchema);


