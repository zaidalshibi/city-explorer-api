const axios = require('axios');

const cache = {};

async function weather(req, res){
        const returnedData = [];
        let lat = req.query.lat;
        let lon = req.query.lon;
        let searchQuery = req.query.searchQuery;
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
        if (cache[searchQuery] === undefined) {
        await axios.get(url).then( response => {response.data.data.forEach(item => { let obj =  new Weather(item.datetime,`Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`);
            returnedData.push(obj)})}
        ).catch(error => {
            res.status(400).send(error)
        }
        )
        cache[searchQuery] = returnedData;}
        else {
            returnedData.push(cache[searchQuery])
        }
        res.send(returnedData)
}

module.exports = weather;

class Weather {
    constructor(datetime, description) {
        this.date = datetime;
        this.description = description;
    }
}