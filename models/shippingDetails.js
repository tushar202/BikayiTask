const mongoose = require('mongoose')

const ShippingDetailsSchema = new mongoose.Schema({
    address: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: String
    },
    purchaseOrderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'purchase'
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer'
    }
})

const ShippingDetails=mongoose.model('ShippingDetails',ShippingDetailsSchema);
module.exports=ShippingDetails