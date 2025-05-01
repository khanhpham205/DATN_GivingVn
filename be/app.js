var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
var mongoose = require("./models/DB");
require('dotenv').config()
// ________________________________
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ________________________________
var r_User = require("./routes/R_users");
var r_chiendich = require("./routes/R_chienDich");
var r_danhmuc = require("./routes/R_danhMuc");

app.use("/user", r_User);
app.use("/chiendich", r_chiendich);
app.use("/danhmuc", r_danhmuc);



app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
