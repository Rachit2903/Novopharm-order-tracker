const { Router } = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Company = mongoose.model("companies");
const Order = mongoose.model("orders");

const { ensureAuth, ensureGuest } = require("../middleware/auth");
const router = new Router;

router.get("/", ensureGuest, (req, res) => {
    res.render("login");
});

router.get("/dashboard", ensureAuth, async (req, res) => {
    const companies = await Company.find({});
    console.log(companies);
    res.locals.user = req.user;
    res.locals.companies = companies;
    res.render("dashboard");
})

router.get("/search", ensureAuth, async (req, res) => {
    try {
        const { itemName, companyName } = req.query;

        let orders;
        if (!companyName) {
            orders = await Order.find({ itemName });
        } else {
            orders = await Order.find({ itemName, companyName });
        }

        if (orders && orders.length > 0) {
            res.status(200).send({});
        } else {
            res.status(404).send({
                error: "No orders found",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            error: "something went wrong",
        })
    }
});

module.exports = router;