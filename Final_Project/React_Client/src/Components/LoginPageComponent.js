import React from 'react'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { checkIfUserExist,findUserID } from '../Utils/Users_Utils';
import { getUserByID } from '../DALs/Users_DAL';
import '../Style/style.css'

//Login Page (Form with login for users)

export default function LoginPage() {

    const [username,setUserName] = useState();
    const [password,setPassword] = useState();

    const navigate = useNavigate(); // for transiton to another page
    const dispatch = useDispatch();

    //Checking to login:
    const checkAndSend = async () => {
        const user = {
            username: username,
            password: password ? password : ''//if password exist password=password, if not password="".
        }
        const isExist = await checkIfUserExist(user)
        if (isExist)
        {
            if (user.password === '')
            {
                alert('An account have not been created yet')
            }
            else
            {
                const id = await findUserID(username)//id of user by user name (findUserID--->from Utils)
                const user = await getUserByID(id)// getUserByID ( from DAL)
                dispatch({ type: "Save User", payload: user })//Saving the user's data in redux
                dispatch({ type: "Save Permissions", payload: user.permissions.permissions })//saving the permission data in redux
                navigate('/mainPage')//navigating to mainpage
            }
        } else
            alert('The Username Or Password Is Incorrect')
    }

    return (
        <div className='loginDiv'>
            <h1 className='loginH1'>Movies -Subscriptions Web Site</h1>
            <div className='loginSmallDiv'>
            <h2 className='loginH2'>Login</h2>
                 <input className='loginInput' type="text" placeholder='Username' onChange={e=>setUserName(e.target.value)}/><br/><br/>
                 <input className='loginInput' type="password" placeholder= 'Password' onChange={e=>setPassword(e.target.value)}/><br/><br/>
                    <button className='loginButton' onClick={checkAndSend}>Login</button><br/><br/>
                    <strong style={{color:"white"}}>New User? </strong><Link style={{color:"lightblue"}} to={'CreateAccount'}>Create New Account</Link>
            </div>
        </div>
    )
}