import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMovieByID, updateMovieById } from '../DALs/MoviesDAL'

export default function EditMovieComp(){
    //all states:
    const [movie, setMovie] = useState()
    const [name, setName] = useState()
    const [genres, setGenres] = useState()
    const [img, setImg] = useState()
    const [premiered, setPremiered] = useState()
    const state = useSelector(state => state)

    const navigate = useNavigate()

    //Loading data to inputs:
    useEffect(async () => {
        const inputMovie = await getMovieByID(state.editMovie)//getMovieByID - from dal movies, state.editMovie - from reducer.
        let date = new Date(inputMovie.premiered)
        date = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + date.getDate()
        setPremiered(date);
        setMovie(inputMovie);
    }, [])

    // Updating the movie with new inputs in DB:
    const updateMovie = async () => {
        console.log(premiered)
        const genresArr = genres?.split(",")
        const movieObj = { ...movie, name: name, geners: genres?genresArr:movie.geners, image: img, premiered: premiered }
        await updateMovieById(movieObj, movie._id)
        navigate('/mainPage/movies/allMovies') //navigating to allMovies page
    }
    return (
        <div className='addUserDiv'>
            <h2 className='editUserH2'>Movies</h2>
            <h3 className='blackH3'>Edit Movie:  {movie?.name}</h3>
            <div className=''>
                <strong>Name: </strong><input className='blackInput' type='text' defaultValue={movie?.name} onChange={e => setName(e.target.value)} /><br />
                <strong>Genres: </strong><input className='blackInput' type='text' defaultValue={movie?.genres.toString()} onChange={e => setGenres(e.target.value)} /><br />
                <strong>Image URL: </strong><input className='blackInput' type='text' defaultValue={movie?.image} onChange={e => setImg(e.target.value)} /><br />
                <strong>Premiered: </strong><input className='blackInput' type='date' defaultValue={premiered} onChange={e => setPremiered(e.target.value)} /><br /><br />
                <button className='addUserButton' onClick={updateMovie}>Update</button>&nbsp;&nbsp;
                <button className='addUserButton'  onClick={() => navigate('/mainPage/movies/allMovies')}>Cancel</button><br/><br/>
            </div>
        </div>
    )
}
