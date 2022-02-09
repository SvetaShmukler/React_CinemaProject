import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function UsersManagmentComp() {
    
    const navigate = useNavigate()
    return (
        <div style={{margin:'auto',textAlign:'center'}}>
            <button className='usersButton' onClick={()=>navigate('/mainPage/usersManagment/allUsers')}>All Users</button>&nbsp;&nbsp;
            <button className='usersButton' onClick={()=>navigate('/mainPage/usersManagment/addUser')}>Add User</button><br/><br/>
            <Outlet/>
        </div>
    )
}
