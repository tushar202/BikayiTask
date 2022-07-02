const { Decimal128 } = require('bson')
const mongoose=require('mongoose')
const { StringDecoder } = require('string_decoder')

const PurchaseSchema=new mongoose.Schema({
    ProductName:{
        type:String
    },
    quantity:{
        type:Number
    },
    pricing:{
        type:Number
    },
    mrp:{
        type:Number
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer'
    },
    shippingdetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ShippingDetails'
    }
    
})

const Purchase=mongoose.model('Purchase',PurchaseSchema)
module.exports=Purchase