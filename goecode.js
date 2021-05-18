const request = require('request')

const geocode = (location, callback) => {
    let geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoicGV0ZXJub3Z1cyIsImEiOiJja25pMXF3b2cwb25qMnBsdzIyZGh3aG4zIn0.Lk0HJZTYYsKGumFG8oxu7w&limit=2'

    request({ url: geoURL, json: true }, (err, res) => {
        if (err) {
            callback('Fail to connect with location service...', undefined)
        } else if (res.body.features.length == 0) {
            callback('Cannot find this location.', undefined)
        } else {
            callback(undefined, {
                place: res.body.features[0].place_name,
                longitude: res.body.features[0].center[0],
                latitude: res.body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode