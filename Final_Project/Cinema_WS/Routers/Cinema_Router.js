const express = require('express')
const usersDAL = require('../DALs/DAL_User')
const usersUtils = require('../Utils/Utils_Users')
const permissionUtils = require('../Utils/Utils_Permissions')
const usersJsonUtils = require('../Utils/Utils_UsersJson')

//creating a router using express
const router = express.Router()

//GET method: that gets all the users using the DAl's functions and utils for the JSONs
router.route('/').get(async (req, res) => {
    try {
        const users = await usersDAL.getAllUsers();//all users
        const permissions = await permissionUtils.getAllUsersPermissions()//all permissions
        const usersJson = await usersJsonUtils.readAllUsers()//all users jsons
        const obj = {
            users: users,
            usersJson: usersJson,
            permissions: permissions
        }

        return res.json(obj)
    }
    catch (error) {
        return res.json(error)
    }
})

//GET method by id: that gets a user by it's ID using the DAl's functions and utils for the JSONs
router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id
        const user = await usersDAL.getOneUser(id)//user by id
        const userJson = await usersJsonUtils.getUserById(id)//user json by id
        const permissions = await permissionUtils.getPermissionByUserId(id)//permissions of user by id
        const obj = {
            user: user,
            userJson: userJson,
            permissions: permissions
        }
        return res.json(obj)
    }
    catch (error) {
        return res.json(error)
    }
})


//POST method: that adds a user to the database using the DAl's functions and utils for the JSONs
router.route('/').post(async (req, res) => {
    const newUser = req.body;
    const users = await usersDAL.getAllUsers();//all users
    if (await usersUtils.checkIfUserExist(users, newUser)) {
        return res.json("false")
    } else {
        await usersDAL.addNewUser(newUser)
        const id = await usersUtils.findUserId(newUser)
        await usersJsonUtils.addUser(newUser, id)
        await permissionUtils.addPermissions(newUser, id)
    }
})

//PUT method: that updates a user in the database by it's ID using the DAl's functions and utils for the JSONs
router.route('/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;
        const result = await usersDAL.updateUser(id, updatedUser)
        await usersJsonUtils.updateUser(updatedUser, id)
        await permissionUtils.updatePermissions(updatedUser, id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

//DELETE method : that deletes a user by it's ID using the DAL's functions and the utils for the JSONs
router.route('/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await usersDAL.deleteUser(id);
        await usersJsonUtils.deleteUser(id)
        await permissionUtils.deletePermissions(id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})


module.exports = router