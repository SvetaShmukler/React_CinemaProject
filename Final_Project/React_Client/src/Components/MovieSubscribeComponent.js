import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../DALs/MoviesDAL'
import { findDontWatchedMovies } from '../Utils/Movies_Utils'
import { addMovieToSubscriptions, getSubscriptionsByMemberId } from '../Utils/Subscriptions_Utils'

export default function MovieSubscribeComp(props){
    //states:
    const [movies, setMovies] = useState()
    const [movie, setMovie] = useState()
    const [date, setDate] = useState()
    const [id, setId] = useState()
    const [boolean, setBoolean] = useState(true)//if movie is first--->true

    //every time the function is loading and gets differnt "props.show" value the function is loading all the movies that the member didnt wathed into the select element
    useEffect(async () => {
        const allMovies = await getAllMovies()//all movies from DB
        const subscription = await getSubscriptionsByMemberId(props.id)//subscriptions of member
        const watchedMovies = subscription?.movies
        let restMovies = []
        if (watchedMovies !== undefined) {
            setBoolean(false)
            restMovies = await findDontWatchedMovies(watchedMovies)
            setMovies(restMovies)
        } else {
            setMovies(allMovies)//if the member didn't watch any movies that load all the movies 
            setBoolean(true)
        }
        setId(props.id)
    }, [props.show])

    //Adding the choosen movie to the member's "movie" array after validation of the inputs:
    const subscribeMovie = async () => 
    {
        const inputMovie = {
            movieId: movie,
            date: date
        }
        if ((movie !== undefined) && (date !== undefined)) 
        {
            if (boolean) 
            {
                props.cb()
                await addMovieToSubscriptions(id, inputMovie)
            } else {
                //await addMovieToSubscriptions(id, inputMovie)
                props.cb()
            }
        }
        else if (movie !== undefined)
            alert('Please Enter Date')
        else
            alert('Please Choose Movie')
    }


    
    //Listing all the options to the select element constaining all the movies that the member didn't watch
    const movieLister = movies?.map((movie, index) => <option key={index} value={movie._id}>{movie.name}</option>)
    return(
props.show?<div className='subAddNewMovieDiv'>
            <h4 className='whiteH4'>Add A New Movie</h4>
            Movies: <select style={{background:"grey",width:"21vh"}} onChange={e => setMovie(e.target.value)}>
                <option></option>
                {movieLister}
            </select><br/><br/>
            Date: <input style={{background:"grey"}} type='date' onChange={e => setDate(e.target.value)} /><br/><br/>
            <button className='yellowButton3' onClick={subscribeMovie}>Subscribe</button>
        </div> :null
    )
}