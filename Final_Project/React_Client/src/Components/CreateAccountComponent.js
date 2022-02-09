import React from 'react'
import  { useState } from 'react'
import { useNavigate } from 'react-router';
import { updateUserById } from '../DALs/Users_DAL';
import { findUserByUserName,checkIfUsernameExist,findUserID, checkIfPasswordExist } from '../Utils/Users_Utils';
import '../Style/style.css'

export default function CreateAccountComp() {

    const [username, setUserName] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate(); // for transiton to another page

  //Checking all the inputs from the client and if it valid it saves the new password in the database:
  const checkAndSend = async () => {
    const existUser = await findUserByUserName(username)//findUserByUserName() from Utils.
    
    const newUserObj = {//Create new obj user(user,userJson,permissions from server)
        user: { username: username, password: password },
        userJson: { ...existUser.userJson },
        permissions: { ...existUser.permissions }
    }
    if (await checkIfUsernameExist(username)) {  //validating the username
        const id = await findUserID(username)//finding id of user
        if (await checkIfPasswordExist(id))  //validating the password
            alert('This User Already Exists')
        else {
            await updateUserById(newUserObj,id)
            navigate('/')   //navigating back to login
        }
    } else
        alert('The Username Is Incorrect')
    }

    return (
        <div className='loginDiv'>
            <h1 className='loginH1'>Movies -Subscriptions Web Site</h1>
            <div className='loginSmallDiv'>
            <h2 className='loginH2'>Create an Account</h2>
            <strong style={{color:'white'}}>Username: </strong> <br/><br/>
            <input className='loginInput' type="text"  onChange={e=>setUserName(e.target.value)}/><br/>
            <strong style={{color:'white'}}>Password: </strong> <br/><br/>
            <input className = 'loginInput' type="password" onChange={e=>setPassword(e.target.value)}/><br/><br/>
            <button className='basicButton' onClick={checkAndSend}>Create</button> &nbsp;&nbsp;
            <button className='basicButton' onClick={() => navigate('/')}>Cancel</button><br />
            </div>       
        </div>)
}