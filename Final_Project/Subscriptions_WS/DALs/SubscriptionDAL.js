const subscriptionModel = require('../Models/Subscription_Schema')


//Get All Subscriptions Data from DB:
const getAllSubscriptions = () => {
    return new Promise((resolve, reject) => {
        subscriptionModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}


//Get a subscription by it's ID using the subscription Model:
const getSubscriptionById = (id) => {
    return new Promise((resolve, reject) => {
        subscriptionModel.findById(id, (err, data) => {
            if (err)
                reject(err)
            else {
                resolve(data)
            }
        })
    })
}


//Add a subscription to the DB using the subscription Model:
const addSubscription = (newSubscription) => {
    return new Promise((resolve, reject) => {
        const subscription = new subscriptionModel(newSubscription)
        subscription.save((err) => {
            if (err)
                reject(err)
            else
                resolve("Subscription was added successfully")
        })
    })
}

//Update a subscription in the DB by it's ID using the subscrition Model:
const updateSubscription = (id, updatedSubscription) => {
    return new Promise((resolve, reject) => {
        subscriptionModel.findByIdAndUpdate(id, updatedSubscription, (err) => {
            if (err)
                reject(err)
            else
                resolve("Subscription was updated successfully")
        })
    })
}

//Delete a member by it's ID using the subscriptionModel
const deleteSubscription = (id) => {
    return new Promise((resolve, reject) => {
        subscriptionModel.findByIdAndDelete(id, (err) => {
            if (err)
                reject(err)
            else
                resolve("Subscription was deleted successfully")
        })
    })
}


module.exports = {getAllSubscriptions,getSubscriptionById,addSubscription,deleteSubscription,updateSubscription}


