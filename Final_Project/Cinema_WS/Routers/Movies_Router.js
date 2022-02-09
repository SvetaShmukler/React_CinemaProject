const express = require('express')
const { getAllMovies, getMovieByID, addMovie, updateMovieById, deleteMovie } = require('../DALs/DAL_Movies')

//creating a router using express
const router = express.Router()

//GET method: that gets all the movies using the DAL's functoins
router.route('/').get(async (req, res) => {
    try {
        const movies = await getAllMovies()
        return res.json(movies)
    }
    catch (error) {
        return res.json(error)
    }
})

//GET method by id: that gets a movie by it's ID using the DAL's functions
router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await getMovieByID(id)
        return res.json(movie)
    }
    catch (error) {
        return res.json(error)
    }
})

//POST method :that adds a movie to the database using the DAL's functoins
router.route('/').post(async (req, res) => {
    const newMovie = req.body;
    const result = await addMovie(newMovie)
    return res.json(result)
})

//PUT method: that updates a movie in the database by it's ID using the DAL's functions
router.route('/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const updatedMovie = req.body;
        const result = await updateMovieById(updatedMovie, id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

// DELETE method: that deletes a movie by it's ID using the DAL's functions
router.route('/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteMovie(id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

module.exports = router;