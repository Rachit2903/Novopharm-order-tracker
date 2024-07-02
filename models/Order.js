const { data } = require("jquery");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    orderNumber: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unitRate: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "Pending",
    }
});

mongoose.model("orders", OrderSchema);