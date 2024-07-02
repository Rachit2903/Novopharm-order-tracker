const { Router } = require("express");
const mongoose = require("mongoose");

const User = mongoose.model("users");
const Order = mongoose.model("orders");

const { ensureAuth } = require("../middleware/auth")
const router = new Router();

router.get("/create", ensureAuth, (req, res) => {
    const { companyId, companyName } = req.query;
    res.locals.user = req.user;
    res.locals.companyId = companyId;
    res.locals.companyName = companyName;
    res.render("create-order");
})

router.post("/create", ensureAuth, async (req, res) => {
    try {
        const order = await Order.create({
            ...req.body,
        })
        console.log(order);
        res.status(201).send({
            id: order._id,
        })
    } catch (error) {
        console.log(error);
        res.send({
            error: "something went wrong",
        })
    }
})
router.get("/view/", ensureAuth, async (req, res) => {
    try {
        const { itemName, companyName } = req.query;

        let orders;
        if (!companyName) {
            orders = await Order.find({ itemName });
        } else {
            orders = await Order.find({ itemName, companyName });
        }

        if (orders && orders.length > 0) {
            res.locals.user = req.user;
            res.locals.orders = orders;
            res.render("order");
        } else {
            res.status(404).send({
                error: "No orders found",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "something went wrong",
        })
    }
})

router.put("/updateStatus/:id", ensureAuth, async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    let order = await Order.findById(orderId);
    if (order) {
        order.status = status;
        await order.save();
        res.status(200).send({
            id: order._id,
        })
    }
    else {
        res.status(404).send({
            error: "order not found",
        })
    }
})
router.get("/access", ensureAuth, async (req, res) => {
    try {
        const { status } = req.query;
        const orders = await Order.find({ status: status });
        console.log(orders);
        res.locals.user = req.user;
        res.locals.orders = orders
        res.render("show-order");
    } catch (error) {
        console.log(error);
        res.send({
            error: "something went wrong",
        })
    }
})
router.delete("/delete/:id", ensureAuth, async (req, res) => {
    try {
        const orderId = req.params.id;
        const deleteResponse = await Order.deleteOne({ _id: orderId });
        console.log(deleteResponse);
        res.send(deleteResponse);
    } catch (error) {
        console.log(error);
        res.send({
            error: "something went wrong",
        })
    }

})
module.exports = router;