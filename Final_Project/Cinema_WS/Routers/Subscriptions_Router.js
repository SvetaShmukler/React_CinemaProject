const express = require('express')
const { getAllSubscriptions, getSubscriptionByID, addSubscription, updateSubscriptionById, deleteSubscription } = require('../DALs/DAL_Subscriptions')

//creating a router using express
const router = express.Router()

//GET method :that gets all the subscriptions using the DAL's functions
router.route('/').get(async (req, res) => {
    try {
        const subscriptions = await getAllSubscriptions()
        return res.json(subscriptions)
    }
    catch (error) {
        return res.json(error)
    }
})

//GET method by id: that gets a subscriptoin by it's ID using the DAL's functions
router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const subscription = await getSubscriptionByID(id)
        return res.json(subscription)
    }
    catch (error) {
        return res.json(error)
    }
})

//POST method: that adds a subscription to the database using the DAL's functions
router.route('/').post(async (req, res) => {
    const newSubscription = req.body;
    const result = await addSubscription(newSubscription)
    return result
})

//PUT method: that updates a subscription in the database by it's ID using the DAL's functions
router.route('/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const updatedSubscription = req.body;
        const result = await updateSubscriptionById(updatedSubscription, id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

//DELETE method :that deletes a subscriptions by it's ID using the DAL's functions 
router.route('/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteSubscription(id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

module.exports = router;