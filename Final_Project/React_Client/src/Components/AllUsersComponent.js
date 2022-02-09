import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../DALs/Users_DAL'
import OneUserComp from './OneUserComponent'

export default function AllUsersComp() {
    const [users, setUsers] = useState()
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    
    //Loading all users then state of users has refresh:
    useEffect(async () => {
        setUsers( await (await getAllUsers()))
    }, [state.refresh])

    const allUsersList = users?.users?.map((user, index) => <OneUserComp id={user._id} cb={()=>dispatch({ type: "REFRESH"})} key={index}/>)
    return(
        <div className='allUsersDiv'>
            <h2 className='usersH2'>Users Managment</h2>
            <div>
                {allUsersList}
            </div>
        </div>
    )
    
    
    
}