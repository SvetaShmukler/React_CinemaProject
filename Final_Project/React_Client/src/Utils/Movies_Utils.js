import { getMemberByID } from "../DALs/Members_DAL"
import { deleteMovie, getAllMovies, getMovieByID } from "../DALs/MoviesDAL"
import {  getAllSubscriptions, updateSubscriptionById } from "../DALs/Subscriptions_DAL"

//Search movies that includes an input word:
const searchMovies = (allMovies, searchInput) => {
    const arrMovies = []//array of movies after Search
    for (let movie of allMovies) {
        if (movie.name.toUpperCase().includes(searchInput.toUpperCase()))
        {
            arrMovies.push(movie)
        }
    }
    return arrMovies
}


//Checking if someone has watched a movie:
const checkIfMovieWatched = async (movieId)=>
{
    let boolean = false // movie dont watched
    const Movie = await getMovieByID(movieId)//specific movie by id
    const subscriptions = await getAllSubscriptions()//subscriptions of this movie
    for (let subscription of subscriptions){
        for (let movie of subscription.movies ){
            if(movie.movieId===Movie._id){
                boolean = true
            }
        }
    }
    return boolean
}

//Delete one movie from Subscriptions what watched this movie:
const deleteMovieFromSub = async (id)=>
{
    const subscriptions = await getAllSubscriptions()
    for (let subscription of subscriptions){
        for(let movie of subscription.movies){
            if(movie.movieId === id){
                let newMovies = subscription.movies
                let index = newMovies.findIndex((movie)=> movie.movieId ===id)
                newMovies.splice(index,1)
                let obj = {...subscription, movies: newMovies}
                await updateSubscriptionById(obj,subscription.memberId)
            }
        }
    }
}

//Delete one movie from Db and from Subscriptions what whatched this movie:
const deleteMovieFromAll = async (id)=>
{
    await deleteMovieFromSub(id)
    await deleteMovie(id)
}

//Checking who of the members has watched a movie:
const whoWatched = async(movieId) =>
{
    const arr=[]//members who has watched
    const subscriptions = await getAllSubscriptions()//all subscriptions
    for (let subscription of subscriptions){
        for(let movie of subscription.movies){
            if(movie.movieId === movieId)//for movie with specific id:
            {
                let member = await getMemberByID(subscription.memberId)
                let obj = {
                    name: member.name,
                    date: movie.date
                }
                arr.push(obj)
            }
        }
    }
    return arr
}

//Finding all the not whatched movies to the member:
const findDontWatchedMovies = async (watchedMovies) => {
    const movies = await getAllMovies()//all movies
    const newArr = []
    for (let movie of movies) {//for each movie checking if its whatched by member
        let bool = false
        for (let watchedMovie of watchedMovies) {
            if (movie._id === watchedMovie.movieId)
                bool = true
        }
        if (!bool)
            newArr.push(movie)
    }
    return newArr
}


// a function that finds a movie by it's name
const findMovieByName = async (name) => 
{
    const movies = await getAllMovies()
    const movie = movies.find((movie) => movie.name === name)
    return movie;
}

//Checking someone has watched the movie
const checkIfSomeoneWatched = async (movieId) => {
    let bool = false
    const Movie = await getMovieByID(movieId)
    const subs = await getAllSubscriptions()
    for (let sub of subs) 
    {
        for (let movie of sub.movies) 
        {
            if (movie.movieId === Movie._id) 
            {
                bool = true//if someone has watched
            }
        }
    }
    return bool
}
export  {searchMovies,checkIfMovieWatched,deleteMovieFromSub,deleteMovieFromAll,whoWatched,findDontWatchedMovies,findMovieByName,checkIfSomeoneWatched}