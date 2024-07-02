const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now(),
    },
})

mongoose.model("companies", companySchema);