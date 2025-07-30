import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
// Placing order with COD
const placeOrder = async(req,res)=>{

    try {
        
        const { userId, items, amount, address } = req.body;
        
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        
        res.json({
            success:true,
            msg:"Order Placed Succeddfully."
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            msg:error.message
        })
    }

}

// Placing order with Stripe
const placeOrderStripe = async(req,res)=>{

    

}

// Placing order with RazorPay
const placeOrderRazorpay = async(req,res)=>{

}

// Display order on admin panel
const allOrders = async(req,res)=>{

    try {
        const orders = await orderModel.find({});
        res.json({
            success:true,
            orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            msg:error.message
        })
    }

}

// Display user order data on client side
const userOrders = async(req,res)=>{
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({
            success:true,
            orders
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            msg:error.message
        })
    }
} 

// update order status from admin panel
const updateStatus = async(req,res)=>{

    try {
        
        const {orderId, status} = req.body;

        const order = await orderModel.findByIdAndUpdate(orderId,{status});

        res.json({
            success:true,
            msg:"Status Updated successfully."
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            msg:error.message
        })
    }

}
export {placeOrder, placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus} 