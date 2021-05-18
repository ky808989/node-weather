const request = require('request')

const weather = (longitude, latitude, callback) => {
    let weatherURL = "http://api.weatherstack.com/current?access_key=40f8a93e63bec490614a57833937f2c0&query="
    weatherURL = weatherURL + latitude + ',' + longitude

    request({ url: weatherURL, json: true }, (err, res) => {
        if (err) {
            callback('Fail to connect with weather service...', undefined)
        } else if (res.body == 0) {
            callback('Cannot find weather information for this location.', undefined)
        } else {
            callback(undefined, {
                name: res.body.location.name,
                weather: res.body.current.weather_descriptions[0],
                temp: res.body.current.temperature,
                precip: res.body.current.precip
            })
        }
    })
}

module.exports = weather