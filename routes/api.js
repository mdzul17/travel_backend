const express = require('express')
const app = express()

const UserRoute = require("./api/UserRoute")
const PlaceRoute = require("./api/PlaceRoute")

app.use('/users', UserRoute)
app.use('/places', PlaceRoute)

module.exports = app