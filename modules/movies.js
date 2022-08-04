const axios = require('axios');

const cache = {};

async function movies(req, res){
    
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.title}`
        if (cache[req.query.title] !== undefined) {
            res.status(200).send(cache[req.query.title]);
            }
        else {
            const dataSet= await axios.get(url)
            try{
            const obj = dataSet.data.results.map(item =>new Movie(item.title,item.overview,item.vote_average,item.vote_count, item.poster_path , item.popularity, item.release_date))
            cache[req.query.title] = obj;
            res.status(200).send(obj);
            }
            catch(error){
                res.status(400).send(error)
            }
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