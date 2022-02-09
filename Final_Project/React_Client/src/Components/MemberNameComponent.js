import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteMember } from '../DALs/Members_DAL'
import { findMemberByName } from '../Utils/Members_Utils'
import { deleteSubscriptionById } from '../Utils/Subscriptions_Utils'
import MoviesWatchedComp from './MoviesWatchedComponent'

export default function MemberNameComp() {
    const { name } = useParams()
    const [Member, setMember] = useState({})
    const [Name, setName] = useState()
    const [Email, setEmail] = useState()
    const [City, setCity] = useState()
    const [refresh, setRefresh] = useState(true)

    const permissions = useSelector(state => state.permissions)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Loading the member to the page:
    useEffect(async () => {
        setMember(await findMemberByName(name))
    }, [])

    //Loading the member's info to the page:
    useEffect(async () => {
        setName(Member.name)
        setEmail(Member.email)
        setCity(Member.city)
    }, [Member])

    
    //Delete a member:
    const deleteMemberButton = async () => {
        let bool = false
        for (let per of permissions)
            if (per === "Delete Subscriptions")
                bool = true
        if (bool) {
            await deleteMember(Member._id)
            await deleteSubscriptionById(Member._id)
            navigate('/mainPage/movies/allMovies')//navigate back to allMovies page
        } else
            alert("You Don't Have The Permission To Delete Subscription")
    }

     //EditMember page if the user has the permission to do it:
     const editMemberButton = () => {
        let bool = false
        for (let per of permissions)
            if (per === "Update Subscriptions")
                bool = true
        if (bool) {
            dispatch({ type: 'Save member for edit it', payload: Member._id })
            navigate('/mainPage/editMember')//navigate to editMember page
        } else
            alert("You Don't Have The Permission To Update Subscription")
    }

    return (
        <div className='memBlackDiv'>
            <h3 className='nameH3'>{Name}</h3>
            <strong>Email: </strong>{Email}<br />
            <strong>City: </strong>{City}<br /><br />
            <button className="yellowButton2" onClick={editMemberButton}>Edit</button>
            <button className="yellowButton2" onClick={deleteMemberButton}>Delete</button><br /><br />
            <MoviesWatchedComp refresh={refresh} cb={() => setRefresh(false)} id={Member?._id} />
        </div>
    )
}

