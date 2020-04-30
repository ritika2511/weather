const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoicml0aWthMjUiLCJhIjoiY2s5MTF1Y3p2MDA3bTNscWU1Z3k1cmwzNCJ9.Kdkx96Ao5iz8c0b68ViRHA"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect.', undefined)
        } else if (body.features.length === 0) {
            callback("Can't find location.", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode