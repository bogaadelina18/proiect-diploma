const { WebhookClient } = require('dialogflow-fulfillment');
var express = require('express');
var axios = require('axios');
var dialogflow = require('dialogflow')
const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Places = mongoose.model('Places');
const Tips = mongoose.model('Tips');
// const WQ = mongoose.model('WQ');
const TQ = mongoose.model('TQ');
// const MQ = mongoose.model('MQ');
const Bots = mongoose.model('Bots');
//const Coupon = mongoose.model('coupon');
//const Registration = mongoose.model('registration');


module.exports = app => {


    app.post('/TQ', function (req, res) {
        console.log(req.body.text)
        // const { question } = req.body.text;
        const { name } = req.body;
        mongoose.model('TQ').findOne({ 'text': req.body.text }, function (err, texts) {
            if (texts !== null) {
                texts.counter++;
                texts.save();
            }
            const TQ2 = new TQ({ text: req.body.text });
            TQ2.save();
        })

        app.get('/getPlace', function (req, res) {
            mongoose.model('Places').findOne({ 'name': req.body.text }, function (err, places) {
                places.forEach(function (place) {
                    console.log(place.name);
                });
                res.send(places);
            })
        })



        // TQ.findOne({ 'text': req.body.text }, function (err, text) {
        //     if (text !== null) {
        //         text.counter++;
        //         text.save();
        //     } else {
        //         const  TQ2= new TQ({ text :req.body.text });
        //         TQ2.save();
        //     }
        // });
    });
    // app.post('/WQ', function (req, res) {
    //     console.log(req.body)
    //     // const { question } = req.body;

    //     WQ.findOne({ 'text': req.body.text }, function (err, text) {
    //         if (text !== null) {
    //             text.counter++;
    //             text.save();
    //         } else {
    //             const  WQ2= new WQ({ text :req.body.text });
    //             WQ2.save();
    //         }
    //     });
    // });
    //  app.post('/MQ', function (req, res) {
    //     console.log(req.body)
    //     //const { question } = req.body;

    //     MQ.findOne({ 'text': req.body.text }, function (err, text) {
    //         if (text !== null) {
    //             text.counter++;
    //             text.save();
    //         } else {
    //             const  MQ2= new MQ({ question :req.body.text });
    //             MQ2.save();
    //         }
    //     });
    // });

    app.post('/bots', function (req, res) {
        const { name } = req.body;
        mongoose.model('Bots').find({}, function (err, bots) {
            bots.forEach(function (bot) {
                console.log(bot.name);
            });
            res.send(bots);
        })
            .sort({ counter: "desc" })

        // Bots.findOne({ 'name': name }, function (err, name) {
        //     if (name !== null) {
        //         name.counter++;
        //         name.save();
        //     } else {
        //         const bots = new Bots({ name :req.body.name });
        //         bots.save();
        //     }
        // });

    });

    app.get('/cityList', function (req, res) {

        mongoose.model('demand').find({}, function (err, demand) {
            demand.forEach(function (city) {
                console.log(city.cityName);
            });
            res.send(demand);
        })
            .sort({ counter: "desc" })
        // Demand.find({}, 'cityName' ,function (err, cities) {
        //     var cityMap = {};

        //     cityName.forEach(function (city) {
        //         cityMap[city.cityName] = city;
        //         console.log("oare merge: " + cityMap[cityName])
        //         // cityMap[city.counter] = city;
        //     });

        //     res.send(cityMap);
        //     //   console.log("oare merge: "+cityMap[cityName])
        //     //   console.log("oare merge 2: "+cityMap[counter])
        // });
    });

    app.get('/placesList', function (req, res) {
        mongoose.model('Places').find({}, function (err, places) {
            places.forEach(function (place) {
                console.log(place.name);
            });
            res.send(places);
        })
            .sort({ counter: "desc" })

        // Places.find({}, function (err, name) {
        //     var placesMap = {};

        //     name.forEach(function (place) {
        //         placesMap[place.name] = place;
        //         console.log("oare merge: " + placesMap[name])
        //         // placesMap[place.counter] = place;
        //     });

        //     res.send(placesMap);
        //     console.log("oare merge: " + placesMap[name])
        //   console.log("oare merge 2: "+placesMap[counter])
        // });
    });

    app.post('/turistic/textQuery', function (req, res, next) {
        // const projectId = process.env.GOOGLE_PROJECT_ID_COVID
        // const sessionId = process.env.DIALOGFLOW_SESSION_ID_COVID
        // const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE


        // // Create a new session
        // const sessionClient = new dialogflow.SessionsClient();
        // const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        // //We need to send some information that comes from the client to Dialogflow API 
        // // The text query request.
        // const cerere = {
        //     session: sessionPath,
        //     queryInput: {
        //         text: {
        //             // The query to send to the dialogflow agent
        //             text: req.body.text,
        //             // The language used by the client (en-US)
        //             languageCode: languageCode,
        //         },
        //     },
        // };

        // const replay = sessionClient.detectIntent(cerere);
        // console.log('Detected intent');
        // const textSent = replay[0].queryResult;
        // console.log(`  Query: ${textSent.queryText}`);



        const agent = new WebhookClient({ request: req, response: res });
        let cityName = agent.parameters["cityName"];

        let placesType = agent.parameters.placesType;
        // let ask = res.queryResult;
        // console.log(" ce  e in ask: " + ask)
        // Questions.findOne({ 'text': "hi" }, function (err, text) {
        //     if (text !== null) {
        //         text.counter++;
        //         text.save();
        //     } else {
        //         const questions = new Questions({ text: "hi" });
        //         questions.save();
        //     }
        // });

        Demand.findOne({ 'cityName': agent.parameters.cityName }, function (err, cityName) {
            if (cityName !== null) {
                cityName.counter++;
                cityName.save();
            } else {
                const demand = new Demand({ cityName: agent.parameters.cityName });
                demand.save();
            }
        });

        // console.log("ce e in queryText: "+req.queryText)
        let detailsPlace;

        const projectId = process.env.GOOGLE_PROJECT_ID_COVID
        const sessionId = process.env.DIALOGFLOW_SESSION_ID_COVID
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

        // Send request and log result
        // const raspunsuri =  sessionClient.detectIntent(cerere);
        // console.log('Detected intent');
        // const rezultat = raspunsuri[0].queryResult;
        // console.log(`  Query: ${rezultat .queryText}`);
        // console.log(`  Response: ${rezultat .fulfillmentText}`);


        if (agent.action == 'sorelocation') {
            console.log("sunt in if ul store location")
            console.log(agent.action)
            axios.get(`https://api.foursquare.com/v2/venues/explore?near=${cityName}&query=${placesType}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20190425`)
                .then(responseInfo => {

                    // console.log("categories : " + responseInfo.data.response.groups.map(groupp => groupp.items.map(item => item.venue.categories[0].name)));
                    let placeList = [];

                    placeList.push(responseInfo.data.response.groups[0].items[0].venue.name);
                    placeList.push(responseInfo.data.response.groups[0].items[1].venue.name);
                    placeList.push(responseInfo.data.response.groups[0].items[2].venue.name);
                    placeList.push(responseInfo.data.response.groups[0].items[3].venue.name);
                    placeList.push(responseInfo.data.response.groups[0].items[4].venue.name);
                    let detailsList = [];

                    let placesFromCity = `In city ${cityName} some ${placesType}  are: ${placeList} `
                    Places.findOne({ 'name': responseInfo.data.response.groups[0].items[0].venue.name }, function (err, name) {
                        if (name !== null) {
                            name.counter++;
                            name.save();
                        } else {
                            const places = new Places(
                                {
                                    idForTips: responseInfo.data.response.groups[0].items[0].venue.id,
                                    name: responseInfo.data.response.groups[0].items[0].venue.name,
                                    address: responseInfo.data.response.groups[0].items[0].venue.location.address,
                                    city: responseInfo.data.response.groups[0].items[0].venue.location.city,
                                    state: responseInfo.data.response.groups[0].items[0].venue.location.state,
                                    country: responseInfo.data.response.groups[0].items[0].venue.location.country,
                                    lat: responseInfo.data.response.groups[0].items[0].venue.location.lat,
                                    lng: responseInfo.data.response.groups[0].items[0].venue.location.lng,
                                    categories: responseInfo.data.response.groups[0].items[0].venue.categories[0].name,
                                    rating: responseInfo.data.response.groups[0].items[0].venue.rating

                                }
                            );
                            detailsPlace0 = {
                                "name": places.name,
                                "address": places.address,
                                "city": places.city,
                                "state": places.state,
                                "country": places.country,
                                "lat": places.lat,
                                "lng": places.lng,
                                "categories": places.categories,
                                "rating": places.rating
                            }
                            detailsList.push(detailsPlace0)
                            places.save();
                        }
                    });
                    Places.findOne({ 'name': responseInfo.data.response.groups[0].items[1].venue.name }, function (err, name) {
                        if (name !== null) {
                            name.counter++;
                            name.save();
                        } else {
                            const places = new Places(
                                {

                                    name: responseInfo.data.response.groups[0].items[1].venue.name,
                                    address: responseInfo.data.response.groups[0].items[1].venue.location.address,
                                    city: responseInfo.data.response.groups[0].items[1].venue.location.city,
                                    state: responseInfo.data.response.groups[0].items[1].venue.location.state,
                                    country: responseInfo.data.response.groups[0].items[1].venue.location.country,
                                    lat: responseInfo.data.response.groups[0].items[1].venue.location.lat,
                                    lng: responseInfo.data.response.groups[0].items[1].venue.location.lng,
                                    categories: responseInfo.data.response.groups[0].items[1].venue.categories[0].name,
                                    rating: responseInfo.data.response.groups[0].items[1].venue.rating
                                }
                            );
                            detailsPlace1 = {
                                "name": places.name,
                                "address": places.address,
                                "city": places.city,
                                "state": places.state,
                                "country": places.country,
                                "lat": places.lat,
                                "lng": places.lng,
                                "categories": places.categories,
                                "rating": places.rating
                            }
                            detailsList.push(detailsPlace1)
                            places.save();
                        }
                    });

                    Places.findOne({ 'name': responseInfo.data.response.groups[0].items[2].venue.name }, function (err, name) {
                        if (name !== null) {
                            name.counter++;
                            name.save();
                        } else {
                            const places = new Places(
                                {

                                    name: responseInfo.data.response.groups[0].items[2].venue.name,
                                    address: responseInfo.data.response.groups[0].items[2].venue.location.address,
                                    city: responseInfo.data.response.groups[0].items[2].venue.location.city,
                                    state: responseInfo.data.response.groups[0].items[2].venue.location.state,
                                    country: responseInfo.data.response.groups[0].items[2].venue.location.country,
                                    lat: responseInfo.data.response.groups[0].items[2].venue.location.lat,
                                    lng: responseInfo.data.response.groups[0].items[2].venue.location.lng,
                                    categories: responseInfo.data.response.groups[0].items[2].venue.categories[0].name,
                                    rating: responseInfo.data.response.groups[0].items[2].venue.rating
                                }
                            );
                            detailsPlace2 = {
                                "name": places.name,
                                "address": places.address,
                                "city": places.city,
                                "state": places.state,
                                "country": places.country,
                                "lat": places.lat,
                                "lng": places.lng,
                                "categories": places.categories,
                                "rating": places.rating
                            }
                            detailsList.push(detailsPlace2)
                            places.save();
                        }
                    });
                    Places.findOne({ 'name': responseInfo.data.response.groups[0].items[3].venue.name }, function (err, name) {
                        if (name !== null) {
                            name.counter++;
                            name.save();
                        } else {
                            const places = new Places(
                                {

                                    name: responseInfo.data.response.groups[0].items[3].venue.name,
                                    address: responseInfo.data.response.groups[0].items[3].venue.location.address,
                                    city: responseInfo.data.response.groups[0].items[3].venue.location.city,
                                    state: responseInfo.data.response.groups[0].items[3].venue.location.state,
                                    country: responseInfo.data.response.groups[0].items[3].venue.location.country,
                                    lat: responseInfo.data.response.groups[0].items[3].venue.location.lat,
                                    lng: responseInfo.data.response.groups[0].items[3].venue.location.lng,
                                    categories: responseInfo.data.response.groups[0].items[3].venue.categories[0].name,
                                    rating: responseInfo.data.response.groups[0].items[3].venue.rating
                                }
                            );
                            detailsPlace3 = {
                                "name": places.name,
                                "address": places.address,
                                "city": places.city,
                                "state": places.state,
                                "country": places.country,
                                "lat": places.lat,
                                "lng": places.lng,
                                "categories": places.categories,
                                "rating": places.rating
                            }
                            detailsList.push(detailsPlace3)
                            places.save();
                        }
                    });
                    Places.findOne({ 'name': responseInfo.data.response.groups[0].items[4].venue.name }, function (err, name) {
                        if (name !== null) {
                            name.counter++;
                            name.save();
                        } else {
                            const places = new Places(
                                {

                                    name: responseInfo.data.response.groups[0].items[4].venue.name,
                                    address: responseInfo.data.response.groups[0].items[4].venue.location.address,
                                    city: responseInfo.data.response.groups[0].items[4].venue.location.city,
                                    state: responseInfo.data.response.groups[0].items[4].venue.location.state,
                                    country: responseInfo.data.response.groups[0].items[4].venue.location.country,
                                    lat: responseInfo.data.response.groups[0].items[4].venue.location.lat,
                                    lng: responseInfo.data.response.groups[0].items[4].venue.location.lng,
                                    categories: responseInfo.data.response.groups[0].items[4].venue.categories[0].name,
                                    rating: responseInfo.data.response.groups[0].items[4].venue.rating
                                }
                            );
                            detailsPlace4 = {
                                "name": places.name,
                                "address": places.address,
                                "city": places.city,
                                "state": places.state,
                                "country": places.country,
                                "lat": places.lat,
                                "lng": places.lng,
                                "categories": places.categories,
                                "rating": places.rating
                            }
                            detailsList.push(detailsPlace4)
                            console.log("am ajuns in ultimul places ")
                            placesFromCity = `In city ${cityName} some ${placesType}  are: ${placeList} `
                            res.setHeader('Content-Type', 'application/json')
                            // let query= `${req.queryResult}`
                            // console.log("query: "+query)
                            res.send(createTuristicResponse(placesFromCity, detailsList));


                            places.save();
                        }
                    });

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
        else if (agent.action=='priceAction') {
            axios.get(`https://api.foursquare.com/v2/venues/explore?near=${cityName}&query=${placesType}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20190425`)
                .then(responseInfo => {
            let intent = agent.intent["displayName"];
            console.log("sunt in else")
            console.log("intent : " + intent)
            console.log("action : " + agent.action)
            let coin = agent.parameters["coin"];
            let number = agent.parameters["number"];
            if (number < 50) {
                let response = `I suggest you Zoo Bucharest or Museum of Mineralogy of Transylvania, Romania`;
                let detailsList = [];
                let urlMineralogy = `https://maramedia.ro/wp-content/uploads/2020/03/Dinozauri-1.jpg`;
                detailsList.push(urlMineralogy)
                let urlZoo = `https://www.seebucharest.ro/wp-content/uploads/2019/05/zoo.jpg`;
                detailsList.push(urlZoo)
                res.setHeader('Content-Type', 'application/json')
                // let query= `${req.queryResult}`
                // console.log("query: "+query)
                res.send(createTuristicResponse(response, detailsList));
            } else if (number > 50 && number <= 100) {
                let response = `I suggest you: for 70 EUR/pers  in Romania, Transfagarasan -Vila Balea -3 nights or
                \r\n for 100 EUR/pers in Maramures Sapanta -Pension Cris-Mona -7 nights and breakfast included or
                \r\n for 60 EUR/pers in Romania, Constanta Vama Veche -Vila Vama Veche -1 night `;
                let detailsList = [];
                let urlBalea = `https://r-cf.bstatic.com/images/hotel/max1024x768/117/117125763.jpg`
                detailsList.push(urlBalea);
                let urlSapanta = `https://travelminit.ro/thumbs/accm-136002/pensiunea-cris-mona-sapanta-720x960.jpg`
                detailsList.push(urlSapanta);
                let urlVama = `https://q-cf.bstatic.com/images/hotel/max1024x768/723/72389342.jpg`
                detailsList.push(urlVama)
                res.setHeader('Content-Type', 'application/json')
                // let query= `${req.queryResult}`
                // console.log("query: "+query)
                res.send(createTuristicResponse(response, detailsList));

            } else if (number > 100 && number <= 300) {
                let response = `I suggest you: for 300 EUR/pers  in Romania, Olimp -Novum by the Sea -3 nights, delux room indoor pool or
                \r\n for 250 EUR/pers in Spain, Madrid -Hotel Santo Domingo -2 nights and breakfast and dinner included`
                let detailsList = [];
                let urlOlimp = `https://r-cf.bstatic.com/images/hotel/max1024x768/249/249575493.jpg`
                detailsList.push(urlOlimp);
                let urlSanto = `https://r-cf.bstatic.com/images/hotel/max1024x768/136/13605424.jpg`
                detailsList.push(urlSanto);
                res.setHeader('Content-Type', 'application/json')
                // let query= `${req.queryResult}`
                // console.log("query: "+query)
                res.send(createTuristicResponse(response, detailsList));
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

        }




    });


}


function createTuristicResponse(textResponseTuristic, details) {
    let response = {
        "fulfillmentText": textResponseTuristic,
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        textResponseTuristic
                    ]
                }
            }
        ],
        "source": "backend",
        "payload": {
            details,

        }
    }
    return response;
}






// app.post('/weather/textQuery', async (req, res) => {
//     const agent = new WebhookClient({ request: req, response: res });

//     function welcome(agent) {
//         agent.add(`Welcome from server!`);
//     }

//     // async function registration(agent) {

//     //     const registration = new Registration({
//     //         name: agent.parameters.name,
//     //         address: agent.parameters.address,
//     //         phone: agent.parameters.phone,
//     //         email: agent.parameters.email,
//     //         dateSent: Date.now()
//     //     });
//     //     try{
//     //         let reg = await registration.save();
//     //         console.log(reg);
//     //     } catch (err){
//     //         console.log(err);
//     //     }
//     // }

//     async function findWeather(agent) {
//         console.log("agent.parameters.cityName : " + agent.parameters.cityName);

//         Demand.findOne({ 'cityName': agent.parameters.cityName }, function (err, cityName) {
//             if (cityName !== null) {
//                 cityName.counter++;
//                 cityName.save();
//             } else {
//                 const demand = new Demand({ cityName: agent.parameters.cityName });
//                 demand.save();
//             }
//         });
//         // let responseText = `You want to learn about ${agent.parameters.courses}. 
//         //         Here is a link to all of my courses: https://www.udemy.com/user/jana-bergant`;

//         if (agent.action === 'input.weather') {
//             console.log("sunt in if ul cu weather now")
//             let city = agent.parameters["cityName"];
//             console.log("cityName : " + city)
//             if (agent.parameters.number == '2' || agent.parameters.number == '3' || agent.parameters.number == '4' || agent.parameters.number == '5') {
//                 console.log("sunt in if ul cu numere ")
//                 //let city = req.body.queryResult.parameters["geo-city"];
//                 let number = agent.parameters["number"];
//                 console.log("number of days : " + number)
//                 let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${process.env.OPENWEATHER_API_KEY}&lang=en`;

//                 console.log(url);

//                 axios.get(url).then(aRes => {
//                     console.log("aRes.data.list[0].main.temp : " + aRes.data.list[0].main.temp)
//                     let kelvinTemp1 = aRes.data.list[0].main.temp;
//                     let temp1 = Math.round(kelvinTemp1 - 273.15);
//                     let kelvinFeelsLike1 = aRes.data.list[0].main.feels_like;
//                     let feels_like1 = Math.round(kelvinFeelsLike1 - 273.15);

//                     let kelvinTemp2 = aRes.data.list[1].main.temp;
//                     let temp2 = Math.round(kelvinTemp2 - 273.15);
//                     let kelvinFeelsLike2 = aRes.data.list[1].main.feels_like;
//                     let feels_like2 = Math.round(kelvinFeelsLike2 - 273.15);

//                     // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//                     // var d = new Date(aRes.data.list[0].dt_txt);
//                     // var dayName = days[d.getDay()];
//                     // console.log("day name:" + dayName)
//                     let ok = aRes.data.list[0].dt.toLocaleDateString();
//                     let ok2 = aRes.data.list[0].dt.toLocaleTimeString();
//                     console.log("ce in ok : " + ok + " ce e in ok 2 : " + ok2);
//                     let responseText = `Weather for 5 days: on: ${aRes.data.list[0].dt_txt} will be ${aRes.data.list[0].weather[0].description}, 
//                     temperature: ${temp1} degrees C feels like: ${feels_like1} degrees C, humidity: ${aRes.data.list[0].main.humidity} %, 
//                     wind speed: ${aRes.data.list[0].wind.speed} mps and clouds  ${aRes.data.list[0].clouds.all} % 
//                     on ${aRes.data.list[1].dt_txt} will be ${aRes.data.list[1].weather[0].description}, 
//                     temperature: ${temp2} degrees C feels like: ${feels_like2} degrees C, 
//                     humidity: ${aRes.data.list[1].main.humidity} %, 
//                     wind speed: ${aRes.data.list[1].wind.speed} mps and clouds ${aRes.data.list[1].clouds.all} %`

//                     agent.send(createWeatherResponseMore(responseText));

//                     // agent.setFollowupEvent('findWeather')

//                     //responseInfo.data.response.groups.map(groupp => groupp.items.map(item => item.venue.categories[0].name)));
//                     //console.log("json: " + aRes.data)
//                     // let days = aRes.data.cnt;
//                     // console.log("number of days : "+days)
//                     // let dataTime = aRes.data.list.map(dts =>dts.dt*1000)
//                     // console.log("data time : " + dataTime)


//                     // var dateTime0 = aRes.data.list[0].dt_txt;
//                     // var dateTime1 = aRes.data.list[1].dt_txt;
//                     // var dateTime2 = aRes.data.list[2].dt_txt;
//                     // var dateTime3 = aRes.data.list[03].dt_txt;
//                     // var day1 = new Date(day1Number * 1000);
//                     // var timeDay1 = day1.toLocaleTimeString();


//                     // var day2Number = aRes.data.list[1].dt;
//                     // var day2 = new Date(day2Number * 1000);
//                     // var timeDay2 = day2.toLocaleTimeString();

//                     // var tempDay1= aRes.data



//                     //console.log("dateTime0  : " + dateTime0  + " dateTime1 : " + dateTime1 + " , dateTime2 : " + dateTime2 + " dateTime3 : " + dateTime3)
//                     //let tempDaily = aRes.data.list.map(lists => lists.main.temp - 273.15)
//                     //let textResponseWeather = `In ${city} , for next ${number} days the temp is: ${tempDaily}`;
//                     //res.send(JSON.stringify(aRes.data))
//                     // res.send(createWeatherResponse(textResponseWeather));


//                 }).catch(err => {
//                     console.log(err);
//                 })
//             }
//             else {
//                 console.log("sunt in else");
//                 let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.OPENWEATHER_API_KEY}`;
//                 console.log(url)
//                 axios.get(url).then(aRes => {
//                     console.log("json: " + aRes.data)
//                     let conditions = aRes.data.weather[0].main;
//                     let description = aRes.data.weather[0].description;
//                     let kelvin = aRes.data.main.temp;
//                     let kelvinMax = aRes.data.main.temp_max;
//                     let kelvinMin = aRes.data.main.temp_min
//                     let pressure = aRes.data.main.pressure;
//                     let humidity = aRes.data.main.humidity;
//                     let secSunrise = aRes.data.sys.sunrise;
//                     var dateSunrise = new Date(secSunrise * 1000);
//                     var timeSunrise = dateSunrise.toLocaleTimeString();
//                     var secSunset = aRes.data.sys.sunset;
//                     var dateSunset = new Date(secSunset * 1000);
//                     var timeSunset = dateSunset.toLocaleTimeString();


//                     let celsius = Math.round(kelvin - 273.15);
//                     let max = Math.round(kelvinMax - 273.15);
//                     let min = Math.round(kelvinMin - 273.15);
//                     let responseText = `In ${city} , it is  ${description} , ${celsius} degrees C right now, \n the maximum temperature: ${max} and minimum : ${min}, pressure: ${pressure} , humidity : ${humidity} and conditions: ${conditions},  the surise time : ${timeSunrise} and sunset time: ${timeSunset}`;
//                     // agent.send(createWeatherResponse(responseText));
//                    res.setHeader('Content-Type', 'application/json')

//                     res.send(createWeatherResponse(responseText));

//                 }).catch(err => {
//                     console.log(err);
//                 })
//             }
//         }

//         // agent.add(responseText);
//     }

//     function fallback(agent) {
//         agent.add(`I didn't understand`);
//         agent.add(`I'm sorry, can you try again?`);
//     }

//     let intentMap = new Map();
//     // intentMap.set('snoopy', snoopy);
//     intentMap.set('Default Welcome Intent', welcome);
//     intentMap.set('findWeather', findWeather);
//     //intentMap.set('recommend courses - yes', registration);
//     intentMap.set('Default Fallback Intent', fallback);

//     agent.handleRequest(intentMap);
// });

// }


// function createWeatherResponse(textResponseWeather) {
// let response = {
//     "fulfillmentText": "This is a text response",
//     "fulfillmentMessages": [
//         {
//             "text": {
//                 "text": [
//                     textResponseWeather
//                 ]
//             }
//         }
//     ],
//     "source": "example.com",
//     "payload": {

//         "google": {
//             "expectUserResponse": true,
//             "richResponse": {
//                 "items": [
//                     {
//                         "simpleResponse": {
//                             "textToSpeech": "this is a simple response"
//                         }
//                     }
//                 ]
//             }
//         },
//         "facebook": {
//             "text": "Hello, Facebook!"
//         },
//         "slack": {
//             "text": "This is a text response for Slack."
//         }
//     }
// }
// return response;
// }

// function createWeatherResponseMore(textResponseWeather) {
// let response = {
//     "queryResult": {


//         "fulfillmentText": "This is a text response",
//         "fulfillmentMessages": [
//             {
//                 "text": {
//                     "text": [
//                         textResponseWeather
//                     ]
//                 }
//             }
//         ],

//         "source": "example.com",
//         "payload": {
//             "google": {
//                 "expectUserResponse": true,
//                 "richResponse": {
//                     "items": [
//                         {
//                             "simpleResponse": {
//                                 "textToSpeech": "this is a simple response"
//                             }
//                         }
//                     ]
//                 }
//             },
//             "facebook": {
//                 "text": "Hello, Facebook!"
//             },
//             "slack": {
//                 "text": "This is a text response for Slack."
//             }
//         }
//     }
// }
// return response;
// }

