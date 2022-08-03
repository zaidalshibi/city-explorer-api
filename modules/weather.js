const axios = require('axios');


async function weather(req, res){
    try {
        let lat = req.query.lat;
        let lon = req.query.lon;
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
        let response = await axios.get(url)
        let data = response.data.data.map(item => new Weather(item.datetime,item.weather.description))
        res.send(data)
        }
    catch (error) {
        res.status(400).send(error)
    }
}

module.exports = weather;

class Weather {
    constructor(datetime, description) {
        this.date = datetime;
        this.description = description;
    }
}