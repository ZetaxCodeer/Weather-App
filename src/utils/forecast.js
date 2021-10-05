const request = require("request")
const forecast = (latitude, longitude, callback) => {
    const apiKey = "496e3ea9e800b3d7d599066a7dea80a9"
    const units = "metric"
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&units=${units}&appid=${apiKey}`
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect to weather service")
        } else if (body.message) {
            callback("Something went wrong, Unable to find location")
        } else {
            const data = body
            callback(undefined,`The weather Today is ${data.current.weather[0].description} and the temp is ${data.current.temp}`);
        }

    })
}

module.exports = {
    forecast
}