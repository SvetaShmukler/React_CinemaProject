const express = require('express')
const subscriptionsDal = require('../DALs/SubscriptionDAL')

const router = express.Router()

//Get method---> to get all the subscriptions using the Dal's function getAllSubscriptions:

router.route('/').get(async(req,res) => {
    try
    {
        const subscriptions = await subscriptionsDal.getAllSubscriptions();
        return res.json(subscriptions);
    }
    catch(error)
    {
        return res.json(error)
    }
})

//Get by ID---> to get a subscription by ID using Dal's function getSubscriptionByID:

router.route('/:id').get(async(req,res) => {
    try
    {
        const id = req.params.id
        const subscription = await subscriptionsDal.getSubscriptionById(id);
        return res.json(subscription);
    }
    catch(error)
    {
        return res.json(error)
    }
})

//Post method---> to add subscription to a DB using the Dal's function addSubscriptions:

router.route('/').post(async(req,res) => {
        const newSubscription = req.body
        const result = await subscriptionsDal.addSubscription(newSubscription).catch(err=>console.log(err));
        return res.json(result);
})

//Put method ---> to update a subscription by ID using Dal's function updateSubscription:

router.route('/:id').put(async (req, res) => {
    const memberId = req.params.id;
    const allSubscriptions = await subscriptionsDal.getAllSubscriptions()//get all Subscriptions from DB by schema
    const subscriptionToUpdate = allSubscriptions.find((subscription) => subscription.memberId === memberId)//get Subscription with specific ID
    const id = subscriptionToUpdate._id.valueOf()//valeoOf()-->to convert an object to a primitive value.
    try {
        const updatedSubscription = req.body;
        const result = await subscriptionsDal.updateSubscription(id, updatedSubscription)//insert in place of existing subscription (by id) updatedSubscription
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

//Delete ---> to delete a subscription by ID using Dal's function deleteSubscription:

router.route('/:id').delete(async(req,res) => {
    try
    {
        const id = req.params.id
        const result = await subscriptionsDal.deleteSubscription(id);
        return res.json(result);
    }
    catch(error)
    {
        return res.json(error)
    }
})

module.exports = router