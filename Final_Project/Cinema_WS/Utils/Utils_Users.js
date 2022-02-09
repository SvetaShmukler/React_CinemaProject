const { getAllUsers } = require("../DALs/DAL_User")



//Function that find and return a user by it's id
const findUserId = async (user) => {
    const allUsers = await getAllUsers()//All Users 
    const foundUser = allUsers.find((obj) => obj.username === user.username)//User with specific ID
    return foundUser._id.valueOf()//id of this user (valueOF() --->to convert an object to a primitive value.)
}

//Function that checks if a user allready exists in the DB:
const checkIfUserExist = async (allUsers, newUser) => {
    if ((allUsers.find((user) => user.username === newUser.username)) === undefined){
        return false
    }
    else{
        return true
    }
}
module.exports = { findUserId, checkIfUserExist }