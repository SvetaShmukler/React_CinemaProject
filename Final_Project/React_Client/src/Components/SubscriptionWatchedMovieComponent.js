import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { whoWatched } from '../Utils/Movies_Utils'
import { useSelector } from 'react-redux'

export default function SubWatchedMovieComp(props){
    const [watched, setWatched] = useState([])

    //Loading all the members who whatching this movie(by movie id):
    useEffect(async () =>
    {
        const arrMembers = (await whoWatched(props.movieId))
        setWatched(arrMembers)
    },[])

    //List of all the members that watched the movie:
    const watchedList = watched?.map((member, index) => <li key={index}><Link to={`/mainPage/member/${member.name}`}>{member.name}</Link>, {member.date} </li>)
    return(< div className='whoWhatchedDiv'>
        <h4 className='blackH4'>Subscriptions Watched:</h4>
        <ul>
            {watchedList}
        </ul>
    </div>)
}