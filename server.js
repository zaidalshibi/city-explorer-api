"use strict";

require('dotenv').config();

const myJson = require('./data/weather.json');

const PORT = 3001;

const express = require('express');

const app = express();

function City(date, description) {
    this.Date = date;
    this.Discription = description;
}

app.get('/weather', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    const returnedWeather = [];
    const arr = [1, 2, 3];

    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;
    if (lon && lat && searchQuery) {

        let obj = myJson.find(element => {
            return (searchQuery == element.city_name)

        });

        if (obj) {
            obj.data.forEach((element) => {
                returnedWeather.push(new City(element.datetime, element.weather.description));
            })
        }

        (returnedWeather.length > 0) ? res.json({ 'weather': returnedWeather }) : res.status(405).send('No Item Found , Please check the Lat or Lon or the City Name ');
    } else {

        res.status(404).send('Please Enter the correct Parameter (lat , Lon ,Search Query)');
    }
});

app.get('*', (req, res) => {

    res.status(406).send('Not Found');
});

app.listen(PORT, () => {
    console.log('Server listening ...');
})