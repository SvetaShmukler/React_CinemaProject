import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../DALs/Users_DAL'
import { moviesPermissionsPressed, subscriptionsPermissionsPressed,checkIfUsernameExist, getPermissions } from '../Utils/Users_Utils'


export default function AddUserComp() {
    //states:
    const [ firstName,setFirstName ] = useState('')
    const [ lastName,setLastName ]  = useState('')
    const [ username,setUsername ] = useState('')
    const [ sessionTimeOut,setSessionTimeOut ] = useState(0)
    const [ permissionsBooleans,setPermissionsBooleans ] = useState([false, false, false, false, false, false, false, false])
    const [ permissionsStrings] = useState(["View Subscriptions", "Create Subscriptions", "Delete Subscriptions", "Update Subscriptions", "View Movies", "Create Movies", "Delete Movies", "Update Movie"])
    const [ refresh, setRefresh] = useState(true)
       
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Checking  wich permission is pressed and according to that it "checking" the "view" permissions:

    useEffect(() =>
    {
        const array = [...permissionsBooleans]
        if(subscriptionsPermissionsPressed(permissionsBooleans))
        {
            array[0]= true
            setPermissionsBooleans(array)
        }
        if(moviesPermissionsPressed(permissionsBooleans))
        {
            array[4]= true
            setPermissionsBooleans(array)
        }
    },[refresh])

    //Saving the clients permissions input of each user:
    const changePermission = (e)=>
    {
        const arr = [...permissionsBooleans]
        e.target.checked ? arr[e.target.name] = true : arr[e.target.name] = false//if cheked in specific index (name=index) save true if not false
        setPermissionsBooleans(arr)
        setRefresh(!refresh)
    }

    //Checking  if the username exist and if not it saves the new user in the DB.
    const saveNewUserInDB = async () => {
        let boolean = await checkIfUsernameExist(username)
        if (!boolean) {
            const newArr = getPermissions(permissionsBooleans)
            var today = new Date()
            var date = (today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())//created date of user
            const obj = {// creating of new user object
                firstName: firstName,
                lastName: lastName,
                createdDate: date,
                sessionTimeOut: sessionTimeOut,
                username: username,
                password: '',
                permissions: newArr
            }
            navigate('/mainPage/usersManagment/allUsers')// navigating back to "allUsers" page
            dispatch({ type: "REFRESH" })
            await (await addUser(obj))
        } else
            alert('This Username is takken')
    }
    //List of permissions checkboxes acccordingly to useEffect's checking:
    const permissionsList = permissionsStrings.map((permission,index) =><span key={index}><input type='checkbox' name={index} onChange={changePermission} checked={permissionsBooleans[index] ? true : false}/>{permission}<br/></span>)

    return(
        <div className='addUserDiv'>
            <br/><strong>First Name : </strong><input type="text" onChange={e => setFirstName(e.target.value)} /><br/><br/>
            <strong>Last Name : </strong><input type="text" onChange={e => setLastName(e.target.value)} /><br/><br/>
            <strong>User Name : </strong><input type="text" onChange={e => setUsername(e.target.value)} /><br/><br/>
            <strong>Session Time Out (Minutes): </strong><input type="number" onChange={e => setSessionTimeOut(e.target.value)} /><br/><br/>
            <strong>Permissions: </strong><br/>
            {permissionsList}<br/>
            <button className='addUserButton' onClick={saveNewUserInDB}>Save</button>&nbsp;&nbsp;
            <button className='addUserButton' onClick={() => navigate('/mainPage/usersManagment/allUsers')}>Cancel</button>
        </div>
    )
    

    
    

}