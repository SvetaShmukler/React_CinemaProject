import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import OneEditUser from "./OneEditUserComponent";

export default function EditUserComp(){
    const [UserJSON, setUserJSON] = useState({})
    const state = useSelector(state => state)

    //Saving the users data to show it's name in the top of the page:
    useEffect(() => {
        setUserJSON(state.editUser.userJson);//state from reduser
    }, [])

    return(
        <div className="addUserDiv">
            <h2 className="editUserH2">Edit User:{UserJSON.firstName} {UserJSON.lastName}</h2>
            <OneEditUser user={state.editUser}/>
        </div>
    )
}