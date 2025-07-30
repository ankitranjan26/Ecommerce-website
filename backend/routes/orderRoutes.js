import express from 'express';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js';
import {placeOrder,placeOrderRazorpay,placeOrderStripe, allOrders, userOrders, updateStatus} from '../controllers/orderController.js'

const orderRouter = express.Router();

// Admin routes
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);


// User Routes to place order
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

// User routes to get order details
orderRouter.post('/userOrders',authUser,userOrders);

export default orderRouter;