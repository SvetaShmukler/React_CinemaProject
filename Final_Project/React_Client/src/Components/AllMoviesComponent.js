import React from "react"
import { useState, useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getAllMovies } from "../DALs/MoviesDAL"
import { searchMovies } from "../Utils/Movies_Utils"
import OneMovieComp from "./OneMovieComponent"

export default function AllMoviesComp() { 
    
    const [startMovies, setStartMovies] = useState()//startMovies - movies on starting
    const [searchInput, setSearchInput] = useState()
    const [searchedMovies, setSearchedMovies] = useState()//on searching
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    
    //Loading all the starting movies before any search was made:
    useEffect(async () => {
        const movies = await getAllMovies()
        setStartMovies(movies)// Changing of state:setStartMovies(movies)--->all movies from data
        setSearchedMovies(movies)//setSearchedMovies --->all movies from data
    }, [state.refresh])//before search

    //Loading all the movies after searching for them:
    useEffect(async () => {
        setSearchedMovies(searchedMovies)//setSearchedMovies --->all movies after searching
    }, [state.refreshMovies])

    //Finding all the searshed movies:
    const searchFunc = async () => {
        const searchResult = searchMovies(startMovies, searchInput)//searchMovies() from Utils
        setSearchedMovies(searchResult);
        dispatch({ type: 'Refresh movies' })
    }

    
    const searchedMoviesList = searchedMovies?.map((movie, index) => <OneMovieComp movie={movie} key={index} />)
    
    return (
        <div >
            <div className='searchDiv'>
                <br/>Find Movie: <input className='searchInput' type='text' onChange={e => setSearchInput(e.target.value)} />
                <button className='yellowButton' onClick={searchFunc}>Find</button></div><br />
            <div className='MovieCompDiv'>
                {searchedMoviesList}
            </div>
        </div>
    )
}