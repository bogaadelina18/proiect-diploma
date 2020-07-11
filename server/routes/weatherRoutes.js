const { WebhookClient } = require('dialogflow-fulfillment');
var express = require('express');
var axios = require('axios');
var dialogflow = require('dialogflow')
const mongoose = require('mongoose');
const CityWeather = mongoose.model('demand');
const Places = mongoose.model('Places');
const Tips = mongoose.model('Tips');
const WQ = mongoose.model('WQ');
//const Coupon = mongoose.model('coupon');
//const Registration = mongoose.model('registration');


module.exports = app => {
    app.post('/agent', function (req, res) {
        console.log(req.body)

        Agent.findOne({ 'name': req.body.text }, function (err, text) {
            if (text !== null) {
                text.counter++;
                text.save();
            } else {
                const Agent = new Agent({ name: req.body.text });
                Agent.save();
            }
        });
    });
    app.post('/WQ', function (req, res) {
        console.log(req.body)
        // const { question } = req.body;

        WQ.findOne({ 'text': req.body.text }, function (err, text) {
            if (text !== null) {
                text.counter++;
                text.save();
            } else {
                const WQ2 = new WQ({ text: req.body.text });
                WQ2.save();
            }
        });
    });

    app.post('/weather/textQuery', function (req, res, next) {
        const agent = new WebhookClient({ request: req, response: res });


        const projectId = process.env.GOOGLE_PROJECT_ID_WEATHER
        const sessionId = process.env.DIALOGFLOW_SESSION_ID_WEATHER
        const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE


        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        //We need to send some information that comes from the client to Dialogflow API 
        // The text query request.
        const cerere = {
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

        if (agent.action === 'input.weather') {
            console.log("sunt in if ul cu weather now")
            let city = agent.parameters["cityName"];
            console.log("cityName : " + city)
            let dayName = agent.parameters["dayName"];

            console.log("dayName : " + dayName)
            //https://weather.ls.hereapi.com/weather/1.0/report.json?product=forecast_7days_simple&name=Chicago&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs
            if (dayName == 'today') {
                console.log("sunt in else");
                let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.OPENWEATHER_API_KEY}`;
                console.log(url)
                axios.get(url).then(aRes => {
                    console.log("json: " + aRes.data)
                    let conditions = aRes.data.weather[0].main;
                    let description = aRes.data.weather[0].description;
                    let kelvin = aRes.data.main.temp;
                    let kelvinMax = aRes.data.main.temp_max;
                    let kelvinMin = aRes.data.main.temp_min
                    let pressure = aRes.data.main.pressure;
                    let humidity = aRes.data.main.humidity;
                    let secSunrise = aRes.data.sys.sunrise;
                    var dateSunrise = new Date(secSunrise * 1000);
                    var timeSunrise = dateSunrise.toLocaleTimeString();
                    var secSunset = aRes.data.sys.sunset;
                    var dateSunset = new Date(secSunset * 1000);
                    var timeSunset = dateSunset.toLocaleTimeString();


                    let celsius = Math.round(kelvin - 273.15);
                    let max = Math.round(kelvinMax - 273.15);
                    let min = Math.round(kelvinMin - 273.15);
                    let responseText = `In ${city} , it is  ${description} , ${celsius} degrees C right now, \n the maximum temperature: ${max} and minimum : ${min}, pressure: ${pressure} , humidity : ${humidity} and conditions: ${conditions},  the surise time : ${timeSunrise} and sunset time: ${timeSunset}`;
                    res.setHeader('Content-Type', 'application/json')
                    res.send(createWeatherResponse(responseText));
                    // agent.context.set(createWeatherResponse(responseText))
                    //agent.add(`In ${city} , it is  ${description} , ${celsius} degrees C right now, \n the maximum temperature: ${max} and minimum : ${min}, pressure: ${pressure} , humidity : ${humidity} and conditions: ${conditions},  the surise time : ${timeSunrise} and sunset time: ${timeSunset}`);
                    //agent.setFollowupEvent('findWeather')

                }).catch(err => {
                    console.log(err);
                })
                .then(function () {
                    // always executed
                });
            }
            else if (agent.parameters.number == '2' || agent.parameters.number == '3' || agent.parameters.number == '4' || agent.parameters.number == '5') {
                console.log("sunt in if ul cu numere ")
                //let city = req.body.queryResult.parameters["geo-city"];
                let number = agent.parameters["number"];
                console.log("number of days : " + number)
                let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${process.env.OPENWEATHER_API_KEY}&lang=en`;

                console.log(url);

                axios.get(url).then(aRes => {
                    console.log("aRes.data.list[0].main.temp : " + aRes.data.list[0].main.temp)
                    let kelvinTemp1 = aRes.data.list[0].main.temp;
                    let temp1 = Math.round(kelvinTemp1 - 273.15);
                    let kelvinFeelsLike1 = aRes.data.list[0].main.feels_like;
                    let feels_like1 = Math.round(kelvinFeelsLike1 - 273.15);

                    let kelvinTemp2 = aRes.data.list[1].main.temp;
                    let temp2 = Math.round(kelvinTemp2 - 273.15);
                    let kelvinFeelsLike2 = aRes.data.list[1].main.feels_like;
                    let feels_like2 = Math.round(kelvinFeelsLike2 - 273.15);

                    // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    // var d = new Date(aRes.data.list[0].dt_txt);
                    // var dayName = days[d.getDay()];
                    // console.log("day name:" + dayName)
                    let ok = aRes.data.list[0].dt.toLocaleDateString();
                    let ok2 = aRes.data.list[0].dt.toLocaleTimeString();
                    console.log("ce in ok : " + ok + " ce e in ok 2 : " + ok2);
                    let responseText = `Weather for 5 days: on: ${aRes.data.list[0].dt_txt} will be ${aRes.data.list[0].weather[0].description}, 
                        temperature: ${temp1} degrees C feels like: ${feels_like1} degrees C, humidity: ${aRes.data.list[0].main.humidity} %, 
                        wind speed: ${aRes.data.list[0].wind.speed} mps and clouds  ${aRes.data.list[0].clouds.all} % 
                        on ${aRes.data.list[1].dt_txt} will be ${aRes.data.list[1].weather[0].description}, 
                        temperature: ${temp2} degrees C feels like: ${feels_like2} degrees C, 
                        humidity: ${aRes.data.list[1].main.humidity} %, 
                        wind speed: ${aRes.data.list[1].wind.speed} mps and clouds ${aRes.data.list[1].clouds.all} %`

                    res.setHeader('Content-Type', 'application/json')
                    res.send(createWeatherResponse(responseText));

                


                }).catch(err => {
                    console.log(err);
                })
                .then(function () {
                    // always executed
                });
            }
         


        }

    })

  

}


function createWeatherResponse(textResponseWeather) {
    let response = {
      
            "fulfillmentText": textResponseWeather,
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [
                            textResponseWeather
                        ]
                    }
                }
            ],
            "source": "example.com",
            "payload": {

                "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "this is a simple response"
                                }
                            }
                        ]
                    }
                }
               
            }

        

    }
    return response;
}
