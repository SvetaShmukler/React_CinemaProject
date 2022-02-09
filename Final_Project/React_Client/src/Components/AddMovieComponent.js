import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addMovie } from '../DALs/MoviesDAL'

export default function AddMovieComp(){
    const [movieName, setMovieName] = useState('')
    const [movieGenres, setMovieGenres] = useState('')
    const [movieImg, setMovieImg] = useState('')
    const [moviePremiered, setMoviePremiered] = useState('')
    const navigate = useNavigate()
    //Building new movie object using inputs:
    const saveNewMovie = async ()=>
    //cheking ---> if all fields are fill 
    {
        if(movieName !== "" && movieGenres !=="" && movieImg !=="" && moviePremiered !== "" )
        {
            let genres = movieGenres?.split(",")//genres is array
            let movieObj = {
                name:movieName,
                genres:genres,
                image:movieImg,
                premiered:moviePremiered
            }
            navigate('/mainPage/movies/allMovies') //back to all movies
            await addMovie(movieObj)
        }
        else{
            alert("please fill all of fields")
        }
    }

    return (
        <div className='addUserDiv'>
            <h3 className='blackH3'>Add New Movie</h3>
                <strong>Name: </strong><input className='blackInput' type='text' onChange={e => setMovieName(e.target.value)} /><br />
                <strong>Genres: </strong><input className='blackInput' type='text' onChange={e => setMovieGenres(e.target.value)} /><br />
                <strong>Img URL: </strong><input className='blackInput' type='text' onChange={e => setMovieImg(e.target.value)} /><br />
                <strong>Premiered: </strong><input className='blackInput' type='date' onChange={e => setMoviePremiered(e.target.value)} /><br />
                <button className='addUserButton' onClick={saveNewMovie}>Save</button>
                <button className='addUserButton' onClick={() => navigate('/mainPage/movies/allMovies')}>cancel</button><br/><br/>
        </div>)
}