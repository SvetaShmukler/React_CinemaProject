const axios = require('axios');

const moviesURL = 'https://api.tvmaze.com/shows'

//Return all the movies from API:
const getAllMovies = async () => {
    return (await axios.get(moviesURL))
}


module.exports =  {getAllMovies}

