const { getAllSubscriptions,deleteSubscription } = require("../DALs/SubscriptionDAL")

//Delete all subscriptions from DB:
const deleteAllSubscriptionsFromDB = async () => {
    const subscriptions = await getAllSubscriptions()//from Dal Subscription
    for (let subscription of subscriptions) {//ForEach(subscription)
        await deleteSubscription(subscription._id)
    }
}
module.exports={deleteAllSubscriptionsFromDB}