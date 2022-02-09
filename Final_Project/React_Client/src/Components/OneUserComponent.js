import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router'
import { useDispatch,useSelector } from 'react-redux'
import { deleteUser, getUserByID } from '../DALs/Users_DAL'
import { checkIfAdmin } from '../Utils/Users_Utils'

export default function OneUserComp(props) {//props --->to get id of each user from parrent component (usersManagmentComp)
    //States:
    const[user,setUser]=useState({})
    const[permissions,setPermissions]=useState()
    const[userJson,setUserJson]=useState({})
    const[isAdmin,setIsAdmin]=useState()//to check if admin, becausean admin has not a button to delete user

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    //Loading all the users obj to the state:
    useEffect(async () => {
        const id = props.id//from UsersManagmentComp
        const user = await getUserByID(id)
        setIsAdmin(await checkIfAdmin(user.user))
        setUser(user?.user)
        setPermissions(user?.permissions)
        setUserJson(user?.userJson)},[props.id, state.refresh])

    //Navigate to edit user page:
    const toEditUser = () =>
    {
        dispatch({ type : "Edit user and save", payload: { user: user, userJson: userJson, permissions: permissions}})
        navigate('/mainPage/editUser')
    }
    //To delete user by id:
    const toDeleteUser = async() =>
    {
       await deleteUser(user._id)
        props.cb()
    }

    return(
        <div className='oneUserDiv'>
           <br/><strong>Name :</strong>{userJson?.firstName} {userJson?.lastName}<br/> 
           <strong>Username :</strong>{user?.username}<br/>
           <strong>Session time out(Minutes) :</strong>{userJson?.sessionTimeOut}<br/>
           <strong>Created date :</strong>{userJson?.createdDate}<br/>
           <strong>Permissions :</strong>{permissions?.permissions.join("','")}<br/><br/>
           <button className='usersButton2' onClick={toEditUser}>Edit</button>
           {!isAdmin?<button className='usersButton2' onClick={toDeleteUser}>Delete</button>: null} <br/><br/>        
        </div>
    )

}