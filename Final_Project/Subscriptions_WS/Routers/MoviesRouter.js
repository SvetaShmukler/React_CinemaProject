const express = require('express')
const moviesBL = require('../BLs/BL_Movies')

const router = express.Router()

//Get method---> to get all the movies using the BL's function getAllMovies:

router.route('/').get(async(req,res) => {
    try
    {
        const movies = await moviesBL.getAllFromDB();
        return res.json(movies);
    }
    catch(error)
    {
        return res.json(error)
    }
})

//Get by ID---> to get a movie by ID using Bl's function getByID:

router.route('/:id').get(async(req,res) => {
    try
    {
        const id = req.params.id
        const movie = await moviesBL.getMovieById(id);
        return res.json(movie);
    }
    catch(error)
    {
        return res.json(error)
    }
})

//Post method---> to add movie to a DB using the Bl function addMovie:

router.route('/').post(async(req,res) => {
        const newMovie = req.body
        const result = await moviesBL.addMovie(newMovie).catch(err=>console.log(err));
        return res.json(result);
})

//Put method ---> to update a movie by ID using Bl's function updateMovie:

router.route('/:id').put(async(req,res) => {
    try
    {
        const id = req.params.id
        const updatedMovie = req.body
        const result = await moviesBL.updateMovie(id,updatedMovie);
        return res.json(result);
    }
    catch(error)
    {
        return res.json(error)
    }
})

//Delete ---> to delete a movie by ID using Bl's function deleteMovie:

router.route('/:id').delete(async(req,res) => {
    try
    {
        const id = req.params.id
        const result = await moviesBL.deleteMovie(id);
        return res.json(result);
    }
    catch(error)
    {
        return res.json(error)
    }
})

module.exports = router