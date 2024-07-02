const express = require("express");
const connectDb = require("./config/db");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const passport = require("passport");

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

connectDb();
require("./models/User");
require("./models/Company");
require("./models/Order");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());


app.use(
    session({
        secret: "mysecreteisthis",
        resave: false,
        saveUninitialized: true,
        store: new mongoStore({ mongooseConnection: mongoose.connection })
    })
);

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/index"));
app.use("/company", require("./routes/company"));
app.use("/order", require("./routes/order"))
app.get("/404-not-found", (req, res) => {
    res.render("404-not-found");
})
app.get("/*", (req, res) => {
    res.render("internal-server")
})

app.listen(PORT, (req, res) => {
    console.log(`server listening on port ${PORT}`);
})
