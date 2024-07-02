const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const passport = require("passport");

const router = new Router;


router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/",
}),
    (req, res) => {
        res.redirect("/dashboard");
    }
)

router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    })
})

module.exports = router;