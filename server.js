const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors())

const route = require("./Routes/index");

const config = require("config");

app.use(route);
module.exports = app;