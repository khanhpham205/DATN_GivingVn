var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
var mongoose = require("./models/DB");
const passport = require('./configs/passport');
const session = require('express-session');
const cors = require('cors');

require('dotenv').config()
// ________________________________
app.use(cors())


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session({
    resave: false,
    saveUninitialized: true,
}));

// ________________________________
var r_User = require("./routes/R_users");
var r_chiendich = require("./routes/R_chienDich");
var r_danhmuc = require("./routes/R_danhMuc");
// var r_donation = require("./routes/R_thanhtoan");
var r_donation = require("./routes/R_donation");

app.use("/user", r_User);
app.use("/chiendich", r_chiendich);
app.use("/danhmuc", r_danhmuc);
app.use("/donation", r_donation);


app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
});

module.exports = app;
