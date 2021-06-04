const express = require("express");
const route = require("express").Router();
const cookie_parser = require("cookie-parser");
route.use(require("express").urlencoded({
    extended: true
}));
route.use(require("express").json());
route.use(cookie_parser());





module.exports = route;