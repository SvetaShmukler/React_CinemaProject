const {writeUsersJson,readUsersJson} = require("../DALs/DAL_UsersJson") //Import functions from DAL UsersJson

//Get All Users from Json File - Users.json used func. readUsersJson - read json file and return Data:

const readAllUsers = ()=>
{
    const allUsers = readUsersJson()
    return allUsers
}

//readAllUsers().then(console.log)


//Geting User from Json File (with readUsers() function from DAL ) - by specific id:

const getUserById = async(id)=>
{
    const allUsers = await readUsersJson()
    //after geting all users from json file - using metod filter to find user with specific id:
    const UserById = allUsers.find((user)=>user.id===id)
    return UserById
}

//getUserById("61dd471f293701fa8d5a00fe").then(console.log)


//Adding new user(object) to the Json File:

const addUser = async(newUser,id) =>
{
    const allUsers = await readUsersJson()
    const obj = {
        id: id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        createdDate: newUser.createdDate,
        sessionTimeOut: newUser.sessionTimeOut
    }
    //Adding a naw user in to array of users:
    allUsers.push(obj)
    writeUsersJson(allUsers)
}

//const user1 = {id:"1",firstName:"Avi",lastName:"Cohen",CreatedDate:"12/12/2021",SessionTimeOut:20}
//addUser(user1)


//Updating user in json file:

const updateUser = async (updatedUser, id) =>
{
    const allUsers = await readUsersJson()
    const obj = {
        id: id,
        firstName: updatedUser.userJson.firstName,
        lastName: updatedUser.userJson.lastName,
        createdDate: updatedUser.userJson.createdDate,
        sessionTimeOut: updatedUser.userJson.sessionTimeOut
    }
    const i = allUsers.findIndex(user=>user.id===id)//Finding i (index) of user with specific id
    //allUsers[i] = updatedUser// Replacing old user with a new one
    //Updating users array:
    allUsers.splice(i, 1, obj)
    writeUsersJson(allUsers)
}

//const user2 = {id:"2",firstName:"Dana",lastName:"AAA",CreatedDate:"12/12/2000",SessionTimeOut:90}
//updateUser("1",user2)


//Delete user in Json File:
const deleteUser = async(id) =>
{
    const allUsers = await readUsersJson()
    const i = allUsers.findIndex((user)=>user.id===id)//Finding i (index) of user with specific id
    //Deleting user with index - i:
    allUsers.splice(i,1)
    writeUsersJson(allUsers)
}
//deleteUser("2")

module.exports= {readAllUsers,getUserById,addUser,updateUser,deleteUser}



