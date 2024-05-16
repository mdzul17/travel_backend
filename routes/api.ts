import express from "express"
const app = express()

import UserRoute from "./api/UserRoute"
import PlaceRoute from "./api/PlaceRoute.js"

app.use('/users', UserRoute)
app.use('/places', PlaceRoute)

module.exports = app