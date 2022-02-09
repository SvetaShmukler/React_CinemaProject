const axios = require ("axios")

//url from mongoDB--->SubscriptionsDB collection members:
const url = 'http://localhost:8001/members'

//Basic functions:

const getAllMembers = async () => (await (await axios.get(url)).data)

const getMemberByID = async (id) => (await (await axios.get(`${url}/${id}`)).data)

const updateMemberById = async (updatedMember, id) => await axios.put(`${url}/${id}`, updatedMember)

const addMember = async (newMember) => await axios.post(url, newMember)

const deleteMember = async (id) => await axios.delete(`${url}/${id}`)

module.exports = { getAllMembers, getMemberByID, updateMemberById, addMember, deleteMember }