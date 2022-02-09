const axios = require ("axios")

//url from mongoDB--->SubscriptionsDB collection members:
const url = 'http://localhost:8001/subscriptions'
//Basic functions:
const getAllSubscriptions = async () => (await (await axios.get(url)).data)

const getSubscriptionByID = async (id) => (await (await axios.get(`${url}/${id}`)).data)

const updateSubscriptionById = async (updatedSubscription, id) => await axios.put(`${url}/${id}`, updatedSubscription)

const addSubscription = async (newSubscription) => await axios.post(url, newSubscription)

const deleteSubscription = async (id) => await axios.delete(`${url}/${id}`)

module.exports= {getAllSubscriptions,getSubscriptionByID,updateSubscriptionById,addSubscription,deleteSubscription}
