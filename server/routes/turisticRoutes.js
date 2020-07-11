const { WebhookClient } = require('dialogflow-fulfillment');
var express = require('express');
var axios = require('axios');
var dialogflow = require('dialogflow')
const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Places = mongoose.model('Places');
const Tips = mongoose.model('Tips');
const Agency = mongoose.model('Agency');
const Offers = mongoose.model('Offers');
const Transport = mongoose.model('Transport');
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

        // if(agent.intent.displayName=='priceInput'){
        //     let coin= agent.parameters["coin"];
        //     let number = agent.parameters["number"];
        //     if(number<50){}
        // }

        
            console.log("sunt in if ul store location")
            console.log(agent.action)
            axios.get(`https://api.foursquare.com/v2/venues/explore?near=${cityName}&query=${placesType}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20190425`)
                .then(responseInfo => {

                    // console.log("categories : " + responseInfo.data.response.groups.map(groupp => groupp.items.map(item => item.venue.categories[0].name)));
                    let placeList = [];
                    let detailsList = [];

                    // let placesFromCity = `In city ${cityName} some ${placesType}  are: ${placeList} `
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
        
        if (agent.action == 'priceAction') {
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
                
                // let query= `${req.queryResult}`
                // console.log("query: "+query)
                res.send(createResponse(response));

            } else if (number > 100 && number <= 300) {
                city=agent.parameters["cityName"]
                Offers.findOne({ 'cityName': city }, function (err, offer) {
                    if (offer !== null) {
                        let response = `For ${agent.parameters["number"]} ${agent.parameters["coin"]} in ${city} 
                        we have on offert ${offer(description)}`
                        res.setHeader('Content-Type', 'application/json')
                        res.send(createResponse(response));
                    } 
                });
                
              
            }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        }else if(agent.action=='transportAction'){
            let cityfrom= agent.action["cityfrom"];
            let cityto=agent.action["cityto"]
            let transport=agent.action["transport"]
            let rasp =`I found ${transport} tickets for 60 EUR/pers from ${cityfrom} to ${cityto} in ${date-period}`
            res.setHeader('Content-Type', 'application/json')
            // let query= `${req.queryResult}`
            // console.log("query: "+query)
            res.send(createResponse(response));
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


function createResponse(textResponseTuristic) {
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
        "source": "backend"
      
    }
    return response;
}


