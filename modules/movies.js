const axios = require('axios');

async function movies(req, res){
    try {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.title}`
        let response = await axios.get(url)
        let data = response.data.results.map(movie => new Movie(movie.title, movie.overview, movie.vote_average, movie.vote_count, movie.poster_path, movie.popularity, movie.release_date))
        res.send(data)
        console.log(response.data)
        }
    catch (error) {
        res.status(400).send(error)
    }
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