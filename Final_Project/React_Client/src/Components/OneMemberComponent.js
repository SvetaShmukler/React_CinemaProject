import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteMember } from "../DALs/Members_DAL"
import { deleteSubscriptionById } from "../Utils/Subscriptions_Utils"
import MoviesWatchedComp from "./MoviesWatchedComponent"
export default function OneMemberComp(props){
    //states:
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [city, setCity] = useState()
    const [refresh, setRefresh] = useState(false)
    const permissions = useSelector(state => state.permissions)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    //Loading all members info:
    useEffect(() => {
        setName(props.member.name)
        setEmail(props.member.email)
        setCity(props.member.city)
    },[props.member])
    
    //Delete member:
    const deleteOneMember = async()=>
    {
        let boolean = false
        //console.log(permissions)

        //checking if user has permissions to delete member:
        for (let per of permissions){
            if(per ==="Delete Subscriptions"){
                boolean = true
            }
        }
        if(boolean){   // if true--> user can to delete
            await deleteMember(props.member._id) //delete member from DB
            await deleteSubscriptionById(props.member._id)//delete subscriptions
            //props.cb()
            //setRefresh(!refresh)
            dispatch({ type: 'REFRESH' })
            navigate('/mainPage/subscriptions/allMembers')
        }
        else
        {
            alert ("You don't have permission to delete member's subscriptions!")
        }   
    }

    //Edit member: 
    const editOneMember = ()=>
    {
        let boolean = false
        //checking if user has permissions to edit member:
        for (let per of permissions){
            if(per ==="Update Subscriptions"){
                boolean = true
            }
        }
        if(boolean){   // if true--> user can to edit
            dispatch({ type: 'Save member for edit it', payload: props.member._id })
            navigate('/mainPage/editMember') //navigate to edit member page
        }
    }
    return(<div className="memDiv">
            <h3 className="nameH3">{name}</h3>
            Email: {email}<br/>
            City: {city}<br/><br/>
            <button className="yellowButton2" onClick={editOneMember}>Edit</button>&nbsp;&nbsp;
            <button className="yellowButton2" onClick={deleteOneMember}>Delete</button>
            <MoviesWatchedComp refresh = {refresh} cb={() => setRefresh(!refresh)} id={props.member?._id}/>
    </div>)
}