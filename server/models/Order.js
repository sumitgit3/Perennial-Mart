import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, //reference to User model,order belongs to which user
    orderItems: [{
        name: { type: String, required: true },
        image: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required },
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }
    }],//orderItems will contain many product(thats why []) and its name,image,qty,price(inside array is multiple embedded objects of order Items)
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    }, //shipping address is a embedded Object
    //payment details
    paymentMethod: { type: String, required: true },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updated_time: { type: String },
        email_address: { type: String }
    },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: date },
    //prices breakdown of order
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    //delivery details
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: date },
}, { timestamps: true });

const Order = mongoose.Model('Order', orderSchema);

export default Order;