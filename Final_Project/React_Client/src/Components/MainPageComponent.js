import React,{useState,useEffect} from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { checkIfAdmin} from '../Utils/Users_Utils'
import '../Style/style.css'


export default function MainPageComp() {

    const [admin, setAdmin] = useState(false)
    const state = useSelector(state => state)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Checking if the user that is logged in is an admin and if it is then the "users management" button will show:
    useEffect(async () => {
        const checkAdmin = await checkIfAdmin(state.user.user)//checkIfAdmin from Utils
        setAdmin(checkAdmin)
        //console.log(state.user.user);
    }, [])


    //link client to Movies Page (only if user has the permission "To View Movies")
    const goToMovies = () =>  
    {
        let boolean = false
        for (let permission of state.permissions)//for each permission
            if (permission === "View Movies"){
            //checking if user has permission 
                boolean = true
            }
        boolean ? navigate('/mainPage/movies/allMovies') : alert("You Don't Have The Permission To View Movies")
    }

    //Link client to the subscriptions page (only if the user has the permission "To View Subscriptions")
    const goToSubscriptions = () =>
    {
        let boolean = false
        for (let permission of state.permissions)
            if (permission === "View Subscriptions")
                boolean = true
        boolean ? navigate('/mainPage/subscriptions/allMembers') : alert("You Don't Have The Permission To View The Subscriptions") 
    }

    //Link the client to the userMangement page and refreshes it:
    const userManagement = () =>
    {
        navigate('/mainPage/usersManagment/allUsers')
        dispatch({ type: "REFRESH" })//refresh (redux)
    }

return (
    (state.user?.user !== undefined)? <div className='mainDiv'>
        <header className='MainPageHeader'>
        <h1 className='mainH1'>Movies - Subscriptions Website - {state.user.user?.username}</h1><br/><br/>
        <button className='menuButtons' onClick={goToMovies}>Movies</button>&nbsp;&nbsp;
        <button className='menuButtons' onClick={goToSubscriptions}>Subscriptions</button>&nbsp;&nbsp;
        {admin ? <button className='menuButtons' onClick={userManagement}>Users Management</button> : null}&nbsp;&nbsp;
        <button className='menuButtons' onClick={() => navigate('/')}>Log Out</button>
    </header>
    <Outlet />
    </div>:<h1>Please Log In To See The Website</h1>
    )
}