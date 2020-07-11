const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var http = require('http');
const setup = require('proxy');
const app = express();
const cors = require('cors');



require('dotenv').config({ path: '.env' });


app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


//db
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_MONGO_URL, { useNewUrlParser: true, useUnifiedTopology:true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//db schema
require('./models/Demand');
require('./models/User');
require('./models/Places');
require('./models/Tips');
require('./models/WQ');
require('./models/TQ');
require('./models/MQ');
require('./models/botPlaces');
require('./models/botWeather');
require('./models/botMotivational');
require('./models/Bots');
require('./models/agent/Agent');
require('./models/Offers');
require('./models/Agency');
require('./models/Transport');

const requireToken = require('./middleware/requireToken');
// const authRoutes = require('./routes/authRoutes');
//app.use('/try', require('./routes/fulfillmentRoutes'));
// app.use('/try', require('./routes/try'));
// require('./routes/fulfillmentRoutes')(app);
require('./routes/motivationalRoutes')(app);
require('./routes/weatherRoutes')(app);
require('./routes/turisticRoutes')(app);
require('./routes/authRoutes')(app);
// app.use(authRoutes)

app.post('/lista', function (req, res) {
    //res.send(JSON.stringify(req.bosy.list))
     console.log(req.body.list);
});
app.get('/lista', function (req, res) {
    res.send(JSON.stringify(req.body.list))
     //console.log(req.body.list);
});


//  app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)



if (process.env.NODE_ENV === 'production') {
    // we are in production - return the prod set of keys
    module.exports = require('./config/prod');


} else {
    // we are in development - return the dev keys!!
    module.exports = require('./config/dev');
}

const port = process.env.PORT || 8080;



app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});


