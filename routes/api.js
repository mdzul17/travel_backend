const express = require('express')
const app = express()
const UserRoute = require("./api/UserRoute")

app.use('/v1/user', UserRoute)

module.exports = app