const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b8d9579cb2e1a8ddcd8652b339d651a7&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    // request({ url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect.', undefined)
        } else if (body.error) {
            callback("Can't find location.", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. Temperature is around ' + body.current.temperature + ' degrees out.' + '<br>' + 'Localdate and time is ' + body.location.localtime)
        }

    })
}

module.exports = forecast