require('../DB/db')
const movieModel = require('../Models/Movies_Schema')
const { getAllMovies } = require('../DALs/MoviesDAL');
const { updateMember } = require('./BL_Members');

//Get All Movies  from DB:
const getAllFromDB = () => {
    return new Promise((resolve, reject) => {
        movieModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
//getAllFromDB().then(console.log)

//Get All Movies by Id from DB using the movieModel:
const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
        movieModel.findById(id, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
//getMovieById("61e5cebf5a0718242059d05e").then(console.log)

//Add a movie to the DB using the movieModel:
const addMovie = (newMovie) => {
    return new Promise((resolve, reject) => {
        const movie = new movieModel(newMovie)
        movie.save((err) => {
            if (err)
                reject(err)
            else
                resolve("Movie was added successfully")
        })
    })
}
//addMovie({name:"Newmovie"})


//Update a movie in the DB by it's ID using the movieModel:
const updateMovie = (id, updatedMovie) => {
    return new Promise((resolve, reject) => {
        movieModel.findByIdAndUpdate(id, updatedMovie, (err) => {
            if (err)
                reject(err)
            else
                resolve("Movie was updated successfully")
        })
    })
}
//updateMovie('61e5d7f8843c2d634e1ff17d',{name:"Movie"})

//Delete a movie by it's ID using the moviesModel
const deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        movieModel.findByIdAndDelete(id, (err) => {
            if (err)
                reject(err)
            else
                resolve("Movie was deleted successfully")
        })
    })
}
//deleteMovie("61e5d7f7843c2d634e1fefed")

//Sending movies to DB (geting all the movies from the DB, delete them, get the new movies from the API and loades them into the DB):

const putMoviesInDB = async () => {
    const movies = await getAllFromDB()//get all movies from DB
    for (const movie of movies)
        await deleteMovie(movie._id)
    const newMovies = await getAllMovies()//get all movies from API
    for (const newMovie of newMovies.data) {
        const date = new Date(newMovie.premiered)
        //creating a new movie by schema:
        const newobj = {
            name: newMovie.name,
            genres: newMovie.genres,
            image: newMovie.image?.medium,
            premiered: date
        }
        await addMovie(newobj)//load movie to DB
    }
}

module.exports = {getAllFromDB,getMovieById,addMovie,deleteMovie,updateMovie,putMoviesInDB}