const axios = require('axios');

const cache = {};

async function movies(req, res){
    const returnedData = [];
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.title}`
        if (cache[req.query.title] === undefined) {
        await axios.get(url).then( response => {response.data.results.forEach(item => { let obj =  new Movie(item.title,item.overview,item.average_votes,item.total_votes, item.image_url , item.popularity, item.release_date);
            returnedData.push(obj)})}
        ).catch(error => {
            res.status(400).send(error)
        }
        )
        cache[req.query.title] = returnedData;}
        else {
            returnedData.push(cache[req.query.title])
        }
        res.send(returnedData)
}

module.exports = movies;

class Movie {
    constructor(title, overview, average_votes, total_votes, image_url, popularity, release_date) {
        this.title = title;
        this.overview = overview;
        this.average_votes = average_votes;
        this.total_votes = total_votes;
        this.image_url = `http://image.tmdb.org/t/p/w500${image_url}`;
        this.popularity = popularity;
        this.release_date = release_date;
    }
}