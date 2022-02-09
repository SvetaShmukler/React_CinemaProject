const usersModel = require('../Models/Users_Schema')

//Get All Users Data from DB:

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        usersModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}


//Get Specific User by Id:
const getOneUser = (id) => {
    return new Promise((resolve, reject) => {
        usersModel.findById(id, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        });
    });
}

//Add new User:
const addNewUser = (newuser) => {
    const newUser = {
        username: newuser.username,
        password: ''
    }
    return new Promise((resolve, reject) => {
        const user = new usersModel(newUser)
        user.save((err) => {
            if (err)
                reject(err)
            else
                resolve("User was added")
        })
    })
}


//Update User:
const updateUser = (id, newUser) => {
    return new Promise((resolve, reject) => {
        usersModel.findByIdAndUpdate(id, newUser.user, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("User updated");
            }
        });
    });
}

//Delete User:
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        usersModel.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("User was Deleted");
            }
        });
    });
}

//getAllUsers().then(x=>console.log(x))


module.exports = { getAllUsers, getOneUser, addNewUser, updateUser, deleteUser }
