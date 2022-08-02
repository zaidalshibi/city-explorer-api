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
    let searchQuery = req.query.searchQuery
    let arr = findData(searchQuery) 
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
function findData (searchQuery) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].city_name == searchQuery) {
            return data[i].data
        }
        else {
            return null
        }
        }
    }

    class Forecast {
        constructor(description, date) {
            this.description = description
            this.date = date
        }
    }