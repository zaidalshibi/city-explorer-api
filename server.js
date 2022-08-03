'use strict'
const express = require('express');
const app = express();


require('dotenv').config();


const weather = require('./modules/weather');
const movies = require('./modules/movies');


const cors = require("cors");
app.use(cors());


const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.get('/', (_req, res) => {
    res.send('Hello World')
}
)

app.get('/weather', weather)
app.get('/movies', movies)