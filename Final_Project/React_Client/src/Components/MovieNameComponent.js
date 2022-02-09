import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMovie } from '../DALs/MoviesDAL';
import { checkIfSomeoneWatched, findMovieByName } from '../Utils/Movies_Utils';
import SubWatchedMovieComp from './SubscriptionWatchedMovieComponent';

export default function MovieNameComp() {
    const { name } = useParams()
    const [movie, setMovie] = useState({})
    const [year, setYear] = useState(0)
    const [genres, setGenres] = useState()
    const [img, setImg] = useState()
    const [checkIfWatched, setCheckIfWatched] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const permissions = useSelector(state => state.permissions)

    //Loading movie to the page:
    useEffect(async () => {
        setMovie(await findMovieByName(name));
    }, [])

    //Loading the movie's info to the page:
    useEffect(async () => {
        setYear(movie.premiered?.slice(0, 4));
        setGenres('"' + movie.genres?.join('", "') + '"');
        setImg(movie?.image);
        setCheckIfWatched(await checkIfSomeoneWatched(movie?._id))
    }, [movie])

    const editMovieButton = () =>
    {
        let bool = false
        for (let per of permissions)
            if (per === "Update Movie")
                bool = true
        if (bool) {
            dispatch({ type: 'Save movie for edit movie', payload: movie._id })
            navigate('/mainPage/editMovie')//navigate to editMovie page
        } else
            alert("You Don't Have The Permission To Update Movie")
    }

    const deleteMovieButton = async () =>
    {
        let bool = false
        for (let per of permissions)
            if (per === "Delete Movies")
                bool = true
        if (bool) {
            await deleteMovie(movie._id)
            navigate('/mainPage/subscriptions/allMembers')
        } else
            alert("You Don't Have The Permission To Delete Movies")
    }

    return (
        <div className='movieNameDiv'>
            <h3>{movie.name}, {year}</h3>
            Geners: {genres}<br /><br />
            <img src={img} alt={movie.name} /><br />
            {checkIfWatched ? <SubWatchedMovieComp movieId={movie._id} />  : null}
            <button className='smallBut' onClick={editMovieButton}>Edit</button>&nbsp;&nbsp;
            <button className='smallBut' onClick={deleteMovieButton}>Delete</button>
        </div>
    )
}