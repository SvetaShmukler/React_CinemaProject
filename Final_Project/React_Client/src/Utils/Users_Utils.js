import { getAllUsers, getUserByID } from '../DALs/Users_DAL'

//Checks if the user exist:
const checkIfUserExist = async (newuser) => {
    const users = await getAllUsers()//All users from server
    //check--->doing a check if new user equals with his name and password to user from users of server:
    const check = users.users?.find((user) =>
    (user?.username).toUpperCase() ===(newuser.username).toUpperCase() && user?.password === newuser.password)
    if (check !== undefined)
    {
        return true
    }
    else
    {
        return false
    }
}

//Finding Users Id by its username:
const findUserID = async (username) => {
    const allUsers = (await getAllUsers())//All users from server
    const user = allUsers.users.find((element) => element.username === username)//finding specific user by its user name
    if (user !== undefined)//if exist
    {
        return user._id.valueOf()//valueOf() - for getting value of user id because it is object.
    }
}

//Finding and return a user by it's id:
const findUserByUserName = async (username) => {
    const allUsers = await getAllUsers()//All users from server
    const user = allUsers.users?.find((element) => element.username.toUpperCase() === username.toUpperCase())//finding specific user by its user name
    const id = user?._id//id of this user
    const foundUser = await getUserByID(id)//getUserByID from DAL , foundUser---> find data of user by id
    return foundUser
}

//Checking if a username is allready exists:
const checkIfUsernameExist = async (username) => {
    const users = (await getAllUsers()).users//All users from server
    //check--->doing a check if new user equals with his name to user from users of server:
    const check = users.find((user) => user.username.toUpperCase() === username.toUpperCase())
    if (check !== undefined)
    {
        return true
    }
    else
    {
        return false
    }
}

//Checking if a password is allready exist:
const checkIfPasswordExist = async (id) => {
    const user = (await getUserByID(id)).user
    if (user?.password !== '')
    {
        return true
    }
    else
    {
        return false
    }       
}


//Cheking if user is the admin:
const checkIfAdmin = async (user) => {
    const allUsers = await getAllUsers()
    if (allUsers.users[1] === undefined)// if only 1 user he is admin.
    {
        return true
    }
    const index = allUsers.users.findIndex((element) => element._id === user?._id)//index of input user
    if (index === 0)//if index=0 its an admin
    {
        return true
    }
    else
    {
        return false
    }
}
// Getting a strings permissions array (permissionsOfUser) and convert it to boolean permissions array and return it:
const getPermissionsArray = (permissionsOfUser) =>
{
    let boolArray = [false,false,false,false,false,false,false,false]
    const permissionsArray = ["View Subscriptions","Create Subscriptions","Delete Subscriptions","Update Subscriptions","View Movies","Create Movies","Delete Movies","Update Movie"]
    for (const per of permissionsArray) {//for each permission of full permission array:
        const permissionElement = permissionsOfUser.find((permission)=>permission===per)//finding element wich = permission of full permissions array
        if(permissionElement!==undefined){//if its finded:
            const index = permissionsArray.findIndex((per)=>per===permissionElement)//we must to find its index in full array
            boolArray[index]=true//its index in boolean array will be changed to true
        }
    }
    return boolArray
}


// a function that check if any of the subscriptions releated permissions were pressed and retrun a bool accordingly
const subscriptionsPermissionsPressed = (arr) => {
    let bool = false
    const newArr = arr.slice(0, 4)
    for (const element of newArr) {
        if (element === true)
            bool = true
    }
    return bool
}

// a function that check if any of the movies releated permissions were pressed and retrun a bool accordingly
const moviesPermissionsPressed = (arr) => {
    let bool = false
    const newArr = arr.slice(4, 8)
    for (const element of newArr) {
        if (element === true)
            bool = true
    }
    return bool
}

//Converting of Boolean Array to string permissions:
const getPermissions = (arr) =>
{
    const permissionsArray = ["View Subscriptions", "Create Subscriptions", "Delete Subscriptions", "Update Subscriptions", "View Movies", "Create Movies", "Delete Movies", "Update Movie"]
    let newArr=[]
    let index = 0
    for(let element of arr){
        if(element)
        {
            newArr.push(permissionsArray[index])
        }
        index++
    }
    return newArr
}




export {checkIfUserExist,findUserID,findUserByUserName,checkIfUsernameExist, checkIfPasswordExist, checkIfAdmin, getPermissionsArray, subscriptionsPermissionsPressed, moviesPermissionsPressed, getPermissions}