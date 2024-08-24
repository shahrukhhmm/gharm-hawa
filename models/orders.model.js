// orders.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    menuname: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    orderstatus: {
        type: String,
        enum: ["pending", "preparing", "route", "delivered"],
        deafult:"preaparing",
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
