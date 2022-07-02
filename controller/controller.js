const Customer=require('../models/customer');
const Purchase = require('../models/purchase');
const ShippingDetails=require('../models/shippingDetails')



exports.postCustomer=async(req,res,next)=>{

    const {CustomerName,email,MobileNumber,city}=req.body;
    const newCustomer=new Customer({
        CustomerName:CustomerName,
        email:email,
        MobileNumber:MobileNumber, 
        city:city
    })
    try{
    const result=await newCustomer.save();
    res.send({
        sucess:true
    })
}catch(err){
    console.log(err);
}
}

exports.postPurchase=async(req,res,next)=>{
    const {ProductName,quantity,pricing,mrp,CustomerId}=req.body
    const newPurchase=new Purchase({
        ProductName:ProductName,
        quantity:quantity,
        pricing:pricing,
        mrp:mrp,
        customer:CustomerId 
    })
    if(pricing>mrp){
        return res.send({
            status:'failed',
            message:'pricing cant be greater than MRP'
        })
    }
    try{
    const purchaseSaved=await newPurchase.save()
    const customer=await Customer.findById(CustomerId)
    customer.purchases.push(purchaseSaved)
    const updatedCustomer=await customer.save()
    res.send({
        success:true
    })
    }catch(err){
        console.log(err)
    }
}

exports.postShippingDetails=async(req,res,next)=>{
    const {address,city,pincode,purchaseOrderId,customerId}=req.body;
    const newShippingDetails=new ShippingDetails({
        address:address,
        city:city,
        pincode:pincode,
        purchaseOrderId:purchaseOrderId,
        customerId:customerId
    })
    const savedShippingDetails=await newShippingDetails.save()
    const purchase=await Purchase.findById(purchaseOrderId)
    purchase.shippingdetails=savedShippingDetails._id
    const customer=await Customer.findById(customerId)
    customer.shippingdetails.push(savedShippingDetails)
    const updatedCustomer= await customer.save()
    const updatedPurchase=await purchase.save()
    res.send({
        success:true
    })

}
 
exports.getCustomersWithPurchase=async (req,res,next)=>{
    const customer=await Customer.find({},['_id','CustomerName','email','MobileNumber','city','purchases']).populate('purchases')
    res.send({
        data:customer
    })
}
 
exports.getCustomersWithPurchaseAndShipping=async (req,res,next)=>{
    const customer=await Customer.find({},['_id','CustomerName','email','MobileNumber','city','purchases']).populate({path:'purchases',populate:{path:'shippingdetails'}})
    res.send({
        data:customer
    })
} 

exports.getCustomerWithSpecificCity=async (req,res,next)=>{
    const city=req.params.city
    const customer=await Customer.find({city:city},['_id','CustomerName','email','MobileNumber','city','shippingdetails']).populate('shippingdetails')
    res.send({
        data:customer
    })
}