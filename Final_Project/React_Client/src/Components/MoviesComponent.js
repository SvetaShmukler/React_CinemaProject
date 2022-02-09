import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

export default function MoviesComp() {
    const navigate = useNavigate()
    const permissions = useSelector(state => state.permissions)

    //Link the client to the addmovie page only if the user has the permission to do it:
    const addMovie = () =>
    {
        let boolean = false
        for (let permission of permissions)//for each permission
            if (permission === "Create Movies"){
            //checking if user has permission 
                boolean = true
            }
        boolean ? navigate('/mainPage/movies/addMovie') : alert("You Don't Have The Permission To Create Movies")

    }
    
    return (
        <div style={{margin:'auto',textAlign:'center'}}>
        <h1 className='moviesH1'>Movies</h1><br/><br/>
            <button className='greyButton' onClick={() => navigate('/mainPage/movies/allMovies')}>All Movies</button>&nbsp;&nbsp;
            <button className='greyButton' onClick={addMovie}>Add Movie</button><br/><br/>
            <Outlet />
        </div>
    )
}
