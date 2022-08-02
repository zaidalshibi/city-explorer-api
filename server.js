'use strict'
const axios = require('axios')
const cors = require("cors");
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}
)
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World')
}
)

app.get('/weather', async (req, res) => {
    try {
        let lat = req.query.lat;
        let lon = req.query.lon;
        let url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
        let response = await axios.get(url)
        let data = new Weather(response.data.data[0].datetime,response.data.data[0].weather.description)
        res.send(data)
        }
    catch (error) {
        res.status(400).send(error)
    }
}
)

class Weather {
    constructor(datetime, description) {
        this.date = datetime;
        this.description = description;
    }
}

app.get('/movies', async (req, res) => {
    try {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.title}`
        let response = await axios.get(url)
        let data = response.data.results.map(movie => new Movie(movie.title, movie.overview, movie.average_votes, movie.total_votes, movie.image_url, movie.popularity, movie.release_date))
        res.send(data)
        }
    catch (error) {
        res.status(400).send(error)
    }
}
)


class Movie {
    constructor(title, overview, average_votes, total_votes, image_url, popularity, release_date) {
        this.title = title;
        this.overview = overview;
        this.average_votes = average_votes;
        this.total_votes = total_votes;
        this.image_url = image_url;
        this.popularity = popularity;
        this.release_date = release_date;
    }
}