//Mapbox Access Token => pk.eyJ1IjoiaGVucmlxdWVub2d1ZWlyYSIsImEiOiJja2N1ZWJsYncwbmlhMnludHcycjlvZDQ5In0.-8rMgUUZ7J2jz9fipXkNHw
// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/taubate.json?access_token=pk.eyJ1IjoiaGVucmlxdWVub2d1ZWlyYSIsImEiOiJja2N1ZWJsYncwbmlhMnludHcycjlvZDQ5In0.-8rMgUUZ7J2jz9fipXkNHw'

const request = require('postman-request')

//Defining function Geocode

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiaGVucmlxdWVub2d1ZWlyYSIsImEiOiJja2N1ZWJsYncwbmlhMnludHcycjlvZDQ5In0.-8rMgUUZ7J2jz9fipXkNHw'
    //console.log (url)
    request({ url, json: true }, (error, { body }) => {
        if (error) { //if erro == true
            callback('Unable to connect to the coordenate service, check internet connection?', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try using different entry.', undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode