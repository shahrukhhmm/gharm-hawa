// order.controller.js
import Order from "../models/orders.model.js";

// Get all orders
async function getOrders(req, res) {
    try {
        const orders = await Order.find().populate('menuname', 'name');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Create a new order
async function createOrder(req, res) {
    try {
        console.log(req.body);
        const { menuname, price, address, phoneNumber } = req.body;
        const order = await Order.create({
            menuname,
            price,
            address,
            phoneNumber
        });
        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Update an existing order
async function updateOrder(req, res) {
    try {
        const { _id, menuname, price, orderstatus, address, phoneNumber } = req.body;
        const order = await Order.findByIdAndUpdate(_id, {
            menuname,
            price,
            orderstatus,
            address,
            phoneNumber
        });
        res.status(200).json({ success: true, message: "Order updated successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Delete an order
async function deleteOrder(req, res) {
    try {
        const { _id } = req.body.orderId;
        await Order.findByIdAndDelete(_id);
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export default { getOrders, createOrder, updateOrder, deleteOrder };
