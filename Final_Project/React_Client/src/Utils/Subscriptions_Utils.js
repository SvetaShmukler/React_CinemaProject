const {  deleteSubscription, getAllSubscriptions, updateSubscriptionById, addSubscription } = require("../DALs/Subscriptions_DAL")

//Finding subscriptions by member id:
const getSubscriptionsByMemberId = async(id)=>
{
    const subs = await getAllSubscriptions()
    const subscription = subs.find((sub)=>sub.memberId===id)
    return subscription
}

//Delete member's subscriptions by member's id:
const deleteSubscriptionById = async(id) =>
{
    const sub = await getSubscriptionsByMemberId(id)
    if (sub !==undefined)
    {
        await deleteSubscription(sub._id)
    }
}

//Checking if a member has subscription:
const checkIfHasSubscription = async(id) =>
{
    let boolean = false //dont has subscription
    const subscriptions = await getAllSubscriptions()//all subscriptions from DB
    for(let sub of subscriptions){
        if(sub.memberId===id){//checking if member with memberId has subscriptions
            boolean = true
        }
    }
    return boolean
}


//Adding a movie to the subscription's movie array in the DB:
const addMovieToSubscriptions = async (memberId, newMovie) => {
    const subBool = await checkIfHasSubscription(memberId)
    if (subBool) {
        const sub = await getSubscriptionsByMemberId(memberId)
        let array = [...sub.movies, newMovie]
        const newObj = { ...sub, movies: array }
        await updateSubscriptionById(newObj, memberId)
    } else {
        const newSub = {
            memberId: memberId,
            movies: [newMovie]
        }
        await addSubscription(newSub)
    }
}

export {deleteSubscriptionById,checkIfHasSubscription,getSubscriptionsByMemberId,addMovieToSubscriptions}