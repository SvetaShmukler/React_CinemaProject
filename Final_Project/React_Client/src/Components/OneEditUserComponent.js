import React,{useState,useEffect} from "react"
import { useNavigate } from "react-router"
import { updateUserById } from "../DALs/Users_DAL"
import { getPermissions, getPermissionsArray, moviesPermissionsPressed, subscriptionsPermissionsPressed } from "../Utils/Users_Utils"
export default function OneEditUser(props)
{
    //states:
    const Navigate = useNavigate()
    const [User, setUser] = useState({})
    const [UserJSON, setUserJSON] = useState({})
    const [Permissions, setPermissions] = useState({})
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [UserName, setUserName] = useState('')
    const [SessionTimeOut, setSessionTimeOut] = useState(0)
    const [PermissionsList, setPermissionsList] = useState([false, false, false, false, false, false, false, false])
    const [PermissionsSTRINGS] = useState(["View Subscriptions", "Create Subscriptions", "Delete Subscriptions", "Update Subscriptions", "View Movies", "Create Movies", "Delete Movies", "Update Movie"])
    const [PermissionsBOOL, setPermissionsBOOL] = useState([])
    const [refresh, setrefresh] = useState([])

   
   //Loading all data in the inputs:
    useEffect(() => {
        const editUser = props.user;
        setUser(editUser.user);
        setUserJSON(editUser.userJson);
        setPermissions(editUser?.permissions?.permissions);
        const arr = getPermissionsArray(editUser.permissions.permissions)
        setPermissionsList(arr)
        setPermissionsBOOL(arr)
    },[])

    //Checking constantly the permission to "check" the "view" permissoin accordingly
    useEffect(() => {
        const arr = [...PermissionsBOOL]
        if (subscriptionsPermissionsPressed(PermissionsBOOL)) {//"view permissions"
            arr[0] = true
            setPermissionsBOOL(arr)
            setPermissionsList(arr)
        }
        if (moviesPermissionsPressed(PermissionsBOOL)) {
            arr[4] = true
            setPermissionsBOOL(arr)
            setPermissionsList(arr)
        }
    }, [refresh])

    //Saving the client's inputs of permissions: 
    const changePermission = (e) => {
        const arr = [...PermissionsList]
        e.target.checked ? arr[e.target.name] = true : arr[e.target.name] = false
        setPermissionsList(arr)
        setPermissionsBOOL(arr)
        setrefresh(!refresh)
    }

    //Geting all the client inputs and updating users data in the DB:
    const updateUserObjPer = async () => {
        const newArr = getPermissions(PermissionsList)//array of permissions
        const newObj = {//bielding object after updating
            user: {
                username: UserName ? UserName : User.username,
                password: User.password,
            },
                userJson: {
                    firstName: FirstName ? FirstName : UserJSON.firstName,
                    lastName: LastName ? LastName : UserJSON.lastName,
                    createdDate: UserJSON.createdDate,
                    sessionTimeOut: SessionTimeOut ? SessionTimeOut : UserJSON.sessionTimeOut,
                },
                permissions: {
                    id: Permissions.id,
                    permissions: newArr ? newArr : Permissions.permissions
                }
            }
        await updateUserById(newObj, User._id)// from Dal ---> update in DB
        Navigate ('/mainPage/usersManagment/allUsers')// navigate back to all user   
    }
    //Permissions Checkboxes list:
    let PermissionLister = ''
    if (PermissionsBOOL[0] !== undefined)
        PermissionLister = PermissionsSTRINGS.map((per, index) => <span key={index}><input type='checkbox' name={index} onChange={changePermission} checked={PermissionsBOOL[index] ? true : false} />{per}<br /></span>)
    return(
        <div>
            First Name : <input type ='text' defaultValue={UserJSON.firstName} onChange={e=>setFirstName(e.target.value)}/><br/><br/>
            Last Name : <input type ='text' defaultValue={UserJSON.lastName} onChange={e=>setLastName(e.target.value)}/><br/><br/>
            Username : <input type ='text' defaultValue={User.username} onChange={e=>setUserName(e.target.value)}/><br/><br/>
            Session time out (Minutes) : <input type ='number'defaultValue={UserJSON.sessionTimeOut} onChange={e=>setSessionTimeOut(e.target.value)}/><br/><br/>
            Created data : {UserJSON.createdDate}<br/><br/>
            Permissions:<br/>
            {PermissionLister}<br/>
            <button className="addUserButton" onClick = {updateUserObjPer} >Update </button>&nbsp;&nbsp;
            <button className= "addUserButton" onClick={() => Navigate('/mainPage/usersManagment/allUsers')}>Cancel</button>
        </div>
    )
}