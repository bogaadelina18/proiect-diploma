const fetch = require('node-fetch');
  require('dotenv').config({ path: '.env' });
    // const config = require('../config/prod');
    //const {OPENWEATHER_API_KEY}= process.env;

    const getWeatherInfo = city =>
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
      )
      
        .then(response => response.json(
          console.log(response)
        )
        //console.log(response)
        )
        
        .then(data => {
          console.log(data)
          const kelvin = data.main.temp;
          const celsius = Math.round(kelvin - 273.15);
          console.log("kelvin " + kelvin)
          return celsius;
        })
        .catch(error => console.log(error));
        //console.log("city " + city)
    module.exports = getWeatherInfo;