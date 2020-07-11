const { WebhookClient } = require('dialogflow-fulfillment');
var express = require('express');
var axios = require('axios');
var dialogflow = require('dialogflow')
const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Places = mongoose.model('Places');
const Tips = mongoose.model('Tips');
const MQ = mongoose.model('MQ');
//const Coupon = mongoose.model('coupon');
//const Registration = mongoose.model('registration');


module.exports = app => {
    app.post('/MQ', function (req, res) {
        console.log(req.body)
        //const { question } = req.body;

        MQ.findOne({ 'text': req.body.text }, function (err, text) {
            if (text !== null) {
                text.counter++;
                text.save();
            } else {
                const  MQ2= new MQ({ question :req.body.text });
                MQ2.save();
            }
        });
    });

app.post('/motivational/textQuery', async (req, res) => {
    try {
        // let secret = req.get("mysecret");
        // if (secret === "12345") {
        //     requesttt = req;
        //     responseee = res;
        //     console.log('Motivational Request headers: ' + JSON.stringify(requesttt.headers));
        //     console.log('Motivational Request body: ' + JSON.stringify(requesttt.body));
        // }

        const agent = new WebhookClient({ request: req, response: res });
        //let cityName = agent.parameters["cityName"];
        res.setHeader('Content-Type', 'application/json')
        //res.send(createWeatherResponseMore(responseText));
        // Send request and log result
        // const responses = await sessionClient.detectIntent(request);
        // console.log('Detected intent');
        const result = agent.queryResult;
        //console.log(`  Query: ${result.queryText}`);
        const raspuns=result.fulfillmentText
        console.log(`  Response: ${result.fulfillmentText}`);

        res.send(raspuns)
    } catch (err) {
        console.log("Input is " + err);
    }
})



//Event Query Route

app.post('/motivational/eventQuery', async (req, res) => {
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


}
