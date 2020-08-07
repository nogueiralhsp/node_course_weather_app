// http://api.weatherstack.com/current
//     ? access_key = YOUR_ACCESS_KEY
//     & query = New York
// 8c54ae07a24ec8deb0063ff1227deba5


// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require ('postman-request')

const forecast = (latitude,longitude,unit,callback) =>{

     const url = 'http://api.weatherstack.com/current?access_key=8c54ae07a24ec8deb0063ff1227deba5&query='+latitude+','+longitude + '&units='+unit
     //console.log(url)
     request({ url, json: true }, (error, {body}) => {
         if (error){
             callback('Unable to connect to weather service!',undefined)
         } else if (body.error){
             callback(body.error,undefined)
         } else {
               callback(undefined,'Weather is '+ body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' \xB0C out. There is a '+body.current.precip+' chance of rain')
         }
     })
 
 }

 module.exports = forecast