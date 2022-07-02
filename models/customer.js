const mongoose=require('mongoose')

const CustomerSchema=new mongoose.Schema({
    CustomerName:{
        type:String
    },
    email:{
        type:String
    },
    MobileNumber:{
        type:String
    },
    city:{
        type:String
    },
    purchases:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Purchase'
    }],
    shippingdetails:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ShippingDetails'
    }]
})

const Customer=mongoose.model('Customer',CustomerSchema);
module.exports=Customer