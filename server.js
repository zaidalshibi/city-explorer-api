'use strict'
const data = require('./data/weather.json')
const cors = require("cors");
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001

app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    }
)

app.get('/', (req, res) => {
    res.send('Hello World')
}
)

app.get('/weather', (req, res) => {
    try {
    let lat = req.query.lat
    let lon = req.query.lon
    let searchQuery = req.query.searchQuery
    let arr = findData(lat, lon, searchQuery) 
    let newArr= arr?.map(element => {
        return new Forecast (element.weather.description ,element.datetime)
    });
    res.status(200).send(newArr)
    }
    catch (error) {
        res.status(400).send(error)
    }
}
)




// Functions and Classes
function findData (lat, lon, searchQuery) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].lat == lat && data[i].lon == lon && data[i].city_name == searchQuery) {
            return data[i].data
        }
        }
    }

    class Forecast {
        constructor(description, date) {
            this.description = description
            this.date = date
        }
    }