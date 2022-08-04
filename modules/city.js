const axios = require('axios');

const cache = {};

async function city(req, res) {
    const returnedData = [];
    let userInput = req.query.searchQuery;
    let chooseValue = req.query.chooseValue;
    let key = `key=${process.env.REACT_APP_A_C}`;
    let format = '&format=json';
    let query = `&q=${userInput}`;
    let url = '';
    if (chooseValue === "US") {
        url = 'https://us1.locationiq.com/v1/search.php?';
    }
    else if (chooseValue === "EU") {
        url = 'https://eu1.locationiq.com/v1/search.php?';
    }
    if (cache[userInput] === undefined) {
        await axios.get(url + key + query + format).then(response => {
            const display_name = response.data[0].display_name;
            const lat = response.data[0].lat;
            const lon = response.data[0].lon;
            const obj = new City(display_name, lat, lon);
            returnedData.push(obj);
        }
        ).catch(error => {
            res.status(400).send(error)
        }
        )
        cache[userInput] = returnedData;
    }
    else {
        returnedData.push(cache[userInput])
    }
    res.send(returnedData)
}

module.exports = city;

class City {
    constructor(display_name, lat, lon) {
        this.display_name = display_name;
        this.lat = lat;
        this.lon = lon;
    }
}