const axios = require('axios');

const cache = {};

async function city(req, res) {
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
    if (cache[userInput] !== undefined) {
        res.status(200).send(cache[userInput]);
    }
    else {
        const dataSet = await axios.get(url + key + format + query);
        try {
            const display_name = dataSet.data[0].display_name;
            const lat = dataSet.data[0].lat;
            const lon = dataSet.data[0].lon;
            let center = `&center=${lat},${lon}`;
            let url2 = "https://maps.locationiq.com/v3/staticmap?";
            let zoom = "&zoom=8";
            let image_url = url2+key+center+zoom;
            const obj = new City(display_name, lat, lon, response2);
            cache[userInput] = obj;
            res.status(200).send(obj);
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
}

class City {
    constructor(display_name, lat, lon, response2) {
        this.display_name = display_name;
        this.lat = lat;
        this.lon = lon;
        this.image_url = response2;
    }
}


module.exports = city;