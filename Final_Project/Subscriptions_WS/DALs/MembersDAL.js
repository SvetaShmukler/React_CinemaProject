const axios = require('axios');

const usersURL = 'https://jsonplaceholder.typicode.com/users'

// A function that return all the users from the API:

const getAllUsers = async () => {
return (await axios.get(usersURL))
}

module.exports =  {getAllUsers}