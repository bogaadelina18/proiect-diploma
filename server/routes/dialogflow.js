const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const axios = require("axios");
const http = require('http')
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config({ path: '.env' });
var fs = require('fs');




const host = 'api.worldweatheronline.com';
const host__location = 'http://open.mapquestapi.com';
const wwoApiKey = process.env.wwoApiKey;
//http://api.worldweatheronline.com/premium/v1/weather.ashx?key=

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());



const list = [];

// function sendPlaces(){
//     fetch('https://002199b5705b.ngrok.io/lista',{
//       method: 'POST',
//       body: JSON.stringify({
//         lista: list
//       }),
//       //headers: {"Content-Type": "application/json"}
//     })
//     .then(function(response){
//     return response.json()
//     }).catch(error => console.log(error));
//   }

var jsonAdrese;
var lat;
var lng;
var verifCity;
var place;
var locatii = [];
var locatie;
var categorie;
var raspuns;

function fetchLatLong(city) {
    try {
        fetch('http://open.mapquestapi.com/geocoding/v1/address?key=' + process.env.API_KEY_LOCATION + '&location=' + city)
            .then(res => res.json())
            .then(data => {
                //jsonAdrese = data
                lat = data.results[0].locations[0].latLng.lat;
                lng = data.results[0].locations[0].latLng.lng;
                verifCity = data.results[0].providedLocation.location;
                //fetchPlaces(lat,lng);

            })
            .then(() => console.log('lat' + lat + ' long ' + lng + ' city ' + verifCity))
    } catch (error) {
        console.error(error);
    }
}



function fetchPlaceLocation(lat, lng, place_type) {
    let types = 'restaurant';
    let radius = 1000;
    let latid = -33.8670522;
    let longit = 151.1957362;
    try {

        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=1500&type=' + place_type + '&key=' + process.env.YOUR_API_KEY, {
            method: 'GET',

            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (res) {
                //jsonAdrese=res.json();
                return res.json();
            })

            .then(function (json) {
                console.log(json)
                //  jsonAdrese=
                //  {
                //     "results" :[
                //         {
                //             "name" : json.results[0].name,
                //             "opening_hours" : json.results[0].opening_hours,
                //             "photos" : json.results[0].photo,
                //             "rating" : json.results[0].rating,
                //             "types" : json.results[0].types,
                //             "vicinity" : json.results[0].vicinity
                //         }
                //     ]
                // };
                // console.log(jsonAdrese)
            })
        //)
        // .then(() => //console.log('raspuns '+data))


    } catch (error) {
        console.error(error);
    }
}

//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY

function fetchPlaces(lat, lng) {
    try {
        fetch('https://places.ls.hereapi.com/places/v1/discover/explore?at=' + lat + ',' + lng + '&apiKey=' + process.env.API_KEY_PLACE)
            .then(res => res.json())
            .then(data => {
                //jsonAdrese = data
                locatie = data.results.items[0].title;
                locatii.push(locatie)
                categorie = data.results.items[0].category.title;
                raspuns = " Locatii " + locatie + "iar categoria " + categorie;
                //console.log("results " + dataP.results.items[0].title + ' categoria: ' + dataP.results.items[0].category.title);

            })
            .then(() => console.log(raspuns))
    } catch (error) {
        console.error(error);
    }
}

//     //https://places.ls.hereapi.com/places/v1/autosuggest?at=40.74917,-73.98529&q=chrysler&apiKey={YOUR_API_KEY}

// }
// // https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=YOUR_API_KEY

//TURISTIC ROUTES
router.post('/turistic/textQuery', async (req, res) => {
    try {

        const projectId = process.env.GOOGLE_PROJECT_ID_COVID
        const sessionId = process.env.DIALOGFLOW_SESSION_ID_COVID
        const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE

        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        //We need to send some information that comes from the client to Dialogflow API 
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    //text: req.body.queryResult.queryText,
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: languageCode,
                },
            },
        };
        let secret = req.get("mysecret");
        if (secret === "12345") {
            const requestt = req;
            const responsee = res;
            console.log('Turist Request headers: ' + JSON.stringify(requestt.headers));
            console.log('Turist Request body: ' + JSON.stringify(requestt.body));
        }
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        if (result.action === 'find-a-place') {
            console.log("am intrat in if")
            //fields['geo-city'].stringValue
            let input = responses[0].queryResult.queryText;
            let place_type = responses[0].queryResult.parameters.fields['placesType'].stringValue;
            console.log(" places-type e : " + place_type)
            const city = responses[0].queryResult.parameters.fields['location'].listValue.values[0].structValue.fields['city'].stringValue; // city is a required param
            //res.send(city)
            console.log("city: " + city)

            // fetchLatLong(city)


            fetchLatLong(city)
            fetchPlaceLocation(lat, lng, place_type)
            {
                console.log("am ajuns inainte de send")
                console.log("ce e in jsonaDRESS " + jsonAdrese)
                //res.send(jsonAdrese)
            }

            //fetchPlaceLocation()
            //{
            // console.log("am ajuns inainte de send")
            // console.log("ce e in jsonaDRESS "+jsonAdrese)
            // res.send(jsonAdrese)
            // }
            //fetchPlaceLocation(input)
            //console.log(jsonAdrese);

            //let date = getPlaces(place_type, city);
            // res.json(date)
            // console.log("date contine: "+date)
            //result.queryResult.fulfillmentMessages[0].text.text[0]=date;
            //result.queryResult.queryText=date;

            // res.send(date)


        }
        //         console.log("output ul de la API: " + output)
        //const responses = await sessionClient.detectIntent(request);
        //console.log('Detected intent');
        //function getPlaces(place_type, city)
        //     console.log(" ce e in responses[0].fulfillmentMessages "+responses[0].queryResult.fulfillmentMessages[0].platform)

        //     if(responses[0].queryResult.fulfillmentMessages[0].platform === 'TELEGRAM' && responses[0].queryResult.fulfillmentMessages[0].message ==='image')

        //     {
        //         console.log("am intrat in if")
        //         const result = responses[0].queryResult.fulfillmentMessages[0].image.imageUri;
        //         console.log("result din if "+result)
        //         console
        //         res.send(result)
        //     }

        //     // Send request and log result
        //    else{
        // console.log("am intrat in else")
        // const result = responses[0].queryResult;
        // console.log(`  Query: ${result.queryText}`);
        // console.log(`  Response: ${result.fulfillmentText}`);

        // res.send(result)
        //}
    } catch (err) {
        console.log("Input is " + err);
    }
})

// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY

router.post('/listPlaces', async (req, res) => {

})







//Event Query Route

router.post('/turist/eventQuery', async (req, res) => {
    try {


        const projectId = process.env.GOOGLE_PROJECT_ID_COVID
        const sessionId = process.env.DIALOGFLOW_SESSION_ID_COVID
        const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE

        //prod
        // const projectId = config.googleProjectID_COVID
        // const sessionId = config.dialogFlowSessionID_COVID
        // const languageCode = config.dialogFlowSessionLanguageCode

        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        //We need to send some information that comes from the client to Dialogflow API 
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: req.body.event,
                    // The language used by the client (en-US)
                    languageCode: languageCode,
                },
            },
        };

        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);

        res.send(result)
    } catch (err) {
        console.log("Input is " + err);
    }
})


https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&name=Chicago&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs

var raspunsNow;

function fetchWeatherNow(city) {
    try {
        fetch('https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&name=' + city + '&apiKey=' + process.env.YOUR_API_KEY, {
            method: 'GET',

            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (res) {
                //jsonAdrese=res.json();
                return res.json();
            })

            .then(function (json) {
                raspunsNow= json.observations
                console.log(json)

            })
        //)
        // .then(() => //console.log('raspuns '+data))


        // .then(res => res.json())
        // .then(data => {
        //     //jsonAdrese = data
        //     lat = data.results[0].locations[0].latLng.lat;
        //     lng = data.results[0].locations[0].latLng.lng;
        //     verifCity=data.results[0].providedLocation.location;
        //     //fetchPlaces(lat,lng);

        // })
        // .then(() => console.log('lat'+lat+' long ' +lng+ ' city '+verifCity))
    } catch (error) {
        console.error(error);
    }
}

router.post('/weather/textQuery', (req, res) => {
    let secret = req.get("mysecret");
    if (secret === "12345") {
        const requestW = req;
        const responseW = res;
        console.log('Weather Request headers: ' + JSON.stringify(requestW.headers));
        console.log('Weather Cookie Request body: ' + JSON.stringify(requestW.body));
    }
    const projectId = process.env.GOOGLE_PROJECT_ID_WEATHER
    const sessionId = process.env.DIALOGFLOW_SESSION_ID_WEATHER
    const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE


    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    // Create a new session

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    console.log(request.queryInput.text.text)


    const responses = sessionClient.detectIntent(request)
        .then(responses => {
            const result = responses[0].queryResult;

            if (result.action == 'input.weather') {
                console.log("am intrat in if")

                let city = result.parameters.fields['geo-city'].stringValue; // city is a required param
                console.log("city: " + city)
                let date = '';
                if (result.parameters.fields['date'].stringValue) {
                    date = (result.parameters.fields['date'].stringValue);
                    console.log('Date: ' + date);
                }
                //result.fulfillmentMessages[0].text[0].text= output
                fetchWeather(city)
                // .then((output) => {
                //     var trimite = output

                //     console.log("output ul de la API: " + output)
                //     //response.json({ 'fulfillmentText': trimite });
                //     // res.setHeader('Content-Type', 'application/json');
                //     // let response = output;
                //     // let responseObj = {
                //     //     "fulfillmentText": response
                //     //     , "fulfillmentMessages": [{ "text": { "text": [trimite] } }]
                //     //     , "source": ""
                //     // }
                //     // console.log("response obj " + responseObj)
                //     //res.send(JSON.stringify({speech:trimite, displayText: trimite, source:'api-weather'}));
                //     res.json(output);
                //     //console.log("am trecut de res.json")
                //     //res.send(responseObj)
                //     console.log("am trecut de res.send")

                // })

                // .catch(() => {
                //     res.json({ 'fulfillmentText': `I don't know the weather but I hope it's good!` });
                // });



            } else {
                res.send(result);
                console.log(`  Query: ${result.queryText}`);
                console.log(`  Response: ${result.fulfillmentText}`);
            }
            //res.json({  'fulfillmentText': trimite });


        })
        .catch(err => {
            console.error('ERROR:', err);
        });

})




//Event Query Route

router.post('/weather/eventQuery', async (req, res) => {
    try {

        //local
        // const projectId = config_weather.googleProjectID
        // const sessionId = config_weather.dialogFlowSessionID
        // const languageCode = config_weather.dialogFlowSessionLanguageCode
        //pe heroku cu .env
        const projectId = process.env.GOOGLE_PROJECT_ID_WEATHER
        const sessionId = process.env.DIALOGFLOW_SESSION_ID_WEATHER
        const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE
        //prod
        // const projectId = config.googleProjectID_WEATHER
        // const sessionId = config.dialogFlowSessionID_WEATHER
        // const languageCode = config.dialogFlowSessionLanguageCode

        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        //We need to send some information that comes from the client to Dialogflow API 
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: req.body.event,
                    // The language used by the client (en-US)
                    languageCode: languageCode,
                },
            },
        };

        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);

        res.send(result)
    } catch (err) {
        console.log("Input is " + err);
    }
})







//MOTIVATIONAL ROUTES


router.post('/motivational/textQuery', async (req, res) => {
    try {
        let secret = req.get("mysecret");
        if (secret === "12345") {
            requesttt = req;
            responseee = res;
            console.log('Motivational Request headers: ' + JSON.stringify(requesttt.headers));
            console.log('Motivational Request body: ' + JSON.stringify(requesttt.body));
        }

        const projectId = process.env.GOOGLE_PROJECT_ID_MOTIVATIONAL
        const sessionId = process.env.DIALOGFLOW_SESSION_ID_MOTIVATIONAL
        const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE


        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        //We need to send some information that comes from the client to Dialogflow API 
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: languageCode,
                },
            },
        };

        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);

        res.send(result)
    } catch (err) {
        console.log("Input is " + err);
    }
})



//Event Query Route

router.post('/motivational/eventQuery', async (req, res) => {
    try {
        //local
        // const projectId = config_motivational.googleProjectID
        // const sessionId = config_motivational.dialogFlowSessionID
        // const languageCode = config_motivational.dialogFlowSessionLanguageCode
        //pe heroku cu .env
        const projectId = process.env.GOOGLE_PROJECT_ID_MOTIVATIONAL
        const sessionId = process.env.DIALOGFLOW_SESSION_ID_MOTIVATIONAL
        const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE

        //prod
        // const projectId = config.googleProjectID_MOTIVATIONAL
        // const sessionId = config.dialogFlowSessionID_MOTIVATIONAL
        // const languageCode = config.dialogFlowSessionLanguageCode
        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        //We need to send some information that comes from the client to Dialogflow API 
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: req.body.event,
                    // The language used by the client (en-US)
                    languageCode: languageCode,
                },
            },
        };

        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);

        res.send(result)
    } catch (err) {
        console.log("Input is " + err);
    }
})





module.exports = router;



async function callWeatherApi(city, date) {
    //const myPromise = new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
    let path = '/premium/v1/weather.ashx?format=json&num_of_days=1' + '&q=' + encodeURIComponent(city) + '&key=' + wwoApiKey + '&date=' + date;
    console.log('API Request: ' + host + path);

    //Make the HTTP request to get the weather
    http.get({ host: host, path: path }, (res) => {
        let body = ''; // var to store the response chunks
        res.on('data', (d) => { body += d; }); // store each response chunk
        res.on('end', () => {
            // After all the data has been received parse the JSON for desired data
            let response = JSON.parse(body);
            console.log("json ul complet: " + response)
            let forecast = response['data']['weather'][0];
            let location = response['data']['request'][0];
            let conditions = response['data']['current_condition'][0];
            let currentConditions = conditions['weatherDesc'][0]['value'];

            // Create response
            let output = `Current conditions in the ${location['type']}, ${location['query']} are ${currentConditions} with a projected high of
${forecast['maxtempC']}°C or ${forecast['maxtempF']}°F and a low of ${forecast['mintempC']}°C or ${forecast['mintempF']}°F on ${forecast['date']}.`;

            // Resolve the promise with the output text
            console.log(output);
            //resolve(output);
            // return output;
            // console.log("Am rezolvat outputul")
            // console.log(output);

        });

        res.on('error', (error) => {
            console.log(`Error calling the weather API: ${error}`)
            reject();
        });
    });
    //});

}