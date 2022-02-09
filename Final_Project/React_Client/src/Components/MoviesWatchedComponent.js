import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMovieByID } from '../DALs/MoviesDAL'
import { checkIfHasSubscription, getSubscriptionsByMemberId } from '../Utils/Subscriptions_Utils'
import MovieSubscribeComp from './MovieSubscribeComponent'

export default function MoviesWatchedComp(props) {
    //states:
    const [moviesArray, setMoviesArr] = useState()
    const [boolean, setBoolean] = useState(false)
    const [showAdd, setshowAdd] = useState(false)

    //Chcecking if the member has a subscription:
    useEffect(async()=>{
        if(await checkIfHasSubscription(props.id))//if member has subscriptions
        {
            const sub = await getSubscriptionsByMemberId(props.id)//subscriptions of member
            let arr = []//array of movies names and date
            for(let movie of sub.movies)//for each movie of subscriptions DB
            {
                let obj = await getMovieByID(movie.movieId)//get movie from DB
                let newObj = {//create movie object
                    name: obj?.name,
                    date: movie.date
                }
                arr.push(newObj)//add to array
            }
            setMoviesArr(arr)
        }
        else
        {
            if(props.refresh)
                props.cb()
            setMoviesArr([])
        }
    },[boolean,props.refresh,props.id])

    //Then a page refresh:
    const refresh = () => {
        setshowAdd(showAdd)
        setBoolean(!boolean)
        props.cb()
    }

    //List of watched movies by member:
    let moviesList = ""
    if(moviesArray !== undefined){
        moviesList = moviesArray?.map((movie,index)=><li key = {index}><Link to={`/mainPage/movie/${movie.name}`}>{movie.name}</Link>, {movie.date} </li>)
    }

    return(<div className='moviesWatched'>
        <h4 className='whiteH4'>Movies Watched:</h4>
        <button className ="yellowButton3"onClick={()=>setshowAdd(!showAdd)}>Subscribe to new movie </button><br/>
        <MovieSubscribeComp id={props.id} cb={refresh} show={showAdd}/><br/>
        <div style={{background:"#f1c343",width:"35vh",margin:"auto",color:'black'}}><ul className='ulStyle'>{moviesList}</ul></div>
    </div>)
}