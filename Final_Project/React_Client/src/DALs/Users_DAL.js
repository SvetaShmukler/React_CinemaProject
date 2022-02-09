import axios from 'axios'

//Basic functions for work with Users data:

const url = 'http://localhost:8002/users'

const getAllUsers = async () => (await(await axios.get(url)).data)

const getUserByID = async (id) => (await (await axios.get(`${url}/${id}`)).data)

const updateUserById = async (updatedUser, id) => await axios.put(`${url}/${id}`, updatedUser)

const addUser = async (newUser) => await axios.post(url, newUser)

const deleteUser = async (id) => await axios.delete(`${url}/${id}`)

export { getAllUsers, getUserByID, updateUserById, addUser, deleteUser } 