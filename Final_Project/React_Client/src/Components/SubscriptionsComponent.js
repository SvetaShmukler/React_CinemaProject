import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";


export default function SubscriptionsComp(){
    const permissions = useSelector(state => state.permissions)
    const navigate = useNavigate()

    //Navigate to addMember page if the user has the permission to do it:
        const goToAddMember = () => {
            let boolean = false
            for (let per of permissions)
                if (per === "Create Subscriptions")
                    boolean = true
            boolean ? navigate('/mainPage/subscriptions/addMember') : alert("You Don't Have The Permission To Add Member")
        }
    
    return (
        <div  style={{margin:'auto',textAlign:'center'}}>
            <h1 className='moviesH1'>Subscriptions</h1><br/><br/>
            <button className="greyButton" onClick={() => navigate('/mainPage/subscriptions/allMembers')}>All Members</button>
            <button className= "greyButton"onClick={goToAddMember}>Add Member</button><br/><br/>
            <Outlet />
        </div>
    )
}