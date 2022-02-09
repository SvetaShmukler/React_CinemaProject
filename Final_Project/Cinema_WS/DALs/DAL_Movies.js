const axios= require ("axios")

//url from mongoDB--->DB collection movies:
const url = 'http://localhost:8001/movies'

//Basic functions:

const getAllMovies = async () => (await (await axios.get(url)).data)

const getMovieByID = async (id) => (await (await axios.get(`${url}/${id}`)).data)

const updateMovieById = async (updatedMovie, id) => await axios.put(`${url}/${id}`, updatedMovie)

const addMovie = async (newMovie) => await axios.post(url, newMovie)

const deleteMovie = async (id) => await axios.delete(`${url}/${id}`)

module.exports={getAllMovies, getMovieByID, updateMovieById, addMovie, deleteMovie}

