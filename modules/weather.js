const axios = require('axios');

const cache = {};

async function weather(req, res){
        let lat = req.query.lat;
        let lon = req.query.lon;
        let searchQuery = req.query.searchQuery;
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
        if (cache[searchQuery] !== undefined) {
            res.status(200).send(cache[searchQuery]);
            }
            else {
            const dataSet = await axios.get(url);
            try{
            const obj = dataSet.data.data.map(item => new Weather(item.datetime,`Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`));
            cache[searchQuery] = obj;
            res.status(200).send(obj);
            }
            catch(error){
                res.status(400).send(error)
            }
        }
}

module.exports = weather;

class Weather {
    constructor(datetime, description) {
        this.date = datetime;
        this.description = description;
    }
}