const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KisanNetworkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' } });

let KisanNetworkModel = mongoose.model('kisannetwork_messagelog', KisanNetworkSchema);

module.exports = KisanNetworkModel;