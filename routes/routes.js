const express = require("express");
const router = express.Router();
const controller=require('../controller/controller')

router.post('/customer',controller.postCustomer)
router.post('/purchase',controller.postPurchase)
router.post('/shippingDetail',controller.postShippingDetails)
router.get('/customerWithPurchase',controller.getCustomersWithPurchase)
router.get('/customerWithPurchaseAndShipping',controller.getCustomersWithPurchaseAndShipping)
router.get('/customerWithSpecificCity/:city',controller.getCustomerWithSpecificCity)
module.exports=router