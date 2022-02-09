const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema ({
    memberId: String,
    movies:Array,
})

module.exports = mongoose.model('subscriptions',SubscriptionSchema);