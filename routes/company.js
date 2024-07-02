const { Router } = require("express")
const mongoose = require("mongoose");

const { ensureAuth } = require("../middleware/auth");

const Company = mongoose.model("companies");
const User = mongoose.model("users");
const Order = mongoose.model("orders");

const router = new Router();

router.get("/create", ensureAuth, (req, res) => {
    res.locals.user = req.user;
    res.render("create-company");
})

router.post("/create", ensureAuth, async (req, res) => {
    try {
        let company = await Company.findOne(req.body)
        if (company) {
            return res.status(200).send({
                message: "company already present",
            })
        }
        company = await Company.create({
            ...req.body,
        });
        console.log(company);
        res.status(201).send({
            id: company._id,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Something went wrong",
        })
    }
})

router.get("/view/:companyId", ensureAuth, async (req, res) => {
    try {
        const companyId = req.params.companyId;

        const company = await Company.findById(companyId);
        if (!company) {
            res.redirect("/404-not-found");
        }
        const orders = await Order.find({ companyId });
        res.locals.user = req.user;
        res.locals.orders = orders;
        res.locals.company = company;
        res.render("company");
    } catch (error) {
        console.log(error);
        res.send({
            error: "something went wrong",
        })
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        const deleteResponse = await Company.deleteOne({ _id: orderId });
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