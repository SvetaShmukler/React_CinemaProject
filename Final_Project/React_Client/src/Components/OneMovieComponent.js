import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkIfMovieWatched, deleteMovieFromAll } from '../Utils/Movies_Utils'
import SubWatchedMovieComp from './SubscriptionWatchedMovieComponent'

export default function OneMovieComp(props) {
    const [movie,setMovie] = useState({})//{}---> object, because movie is an object
    const [year,setYear] = useState(0)// number
    const [genres,setGenres] = useState()
    const [imgMovie,setImgMovie] = useState()
    const [checkIfWatched,setCheckIfWatched] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const permissions = useSelector(state =>state.permissions)

    //Loading all of the each movies components to the page:
    useEffect(async () =>
    {
        setMovie(props.movie)//its all obj:{name,genres,premiered}
        setYear(props.movie.premiered.slice(0,4))//its date formate and look like this:"premiered" : ISODate("2013-06-24T00:00:00.000Z")
        setGenres('"' + props.movie.genres.join('","')+'"')
        setImgMovie(props.movie.image)
        setCheckIfWatched(await checkIfMovieWatched(props.movie._id))//checking if watched? true:false
    },[props.movie])

    //cheching if user has a permission "update movie"
    const editMovie = () =>
    {
        let boolean = false
        for (let permission of permissions)//cheking
        {
            if(permission === "Update Movie")
            {
                boolean = true//if he has
            }
        }
        if (boolean)//  if user has permission "edit movie":
        {
            dispatch({type: "Save movie for edit movie", payload: props.movie._id})
            navigate('/mainPage/editMovie')//navigate to edit movie page
        }
        else
        {
            alert ("You Don't Have The Permission To Update Movie")
        }
    }

    //Delete movie:
    const deleteMovie = async()=>
    {
        let boolean = false
        for(let permission of permissions){
            if (permission ==="Delete Movies"){//if user has permission "Delete Movie" 
                boolean = true
            }
        }
        if (boolean){
            await deleteMovieFromAll(props.movie._id)//delete movie from subscriptions and DB
            dispatch({ type: 'REFRESH' })
        }
        else{
            alert("You dont have the permission to Delete Movie")
        }
    }


    return(
        <div className='movieDiv'>
            <h3>{movie.name},{year}</h3>
            <h4 className='genresH4'>genres: {genres}</h4><br/>
            <img src={imgMovie} alt={movie.name}/><br/><br/>
            <button className='smallBut' onClick={editMovie}>Edit</button>&nbsp;&nbsp;
            <button className='smallBut' onClick={deleteMovie}>Delete</button><br/><br/>
            {checkIfWatched ? <SubWatchedMovieComp movieId={movie._id}/> : null }
        </div>
    )

}