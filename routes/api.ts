import express from "express"
const app = express()

import UserRoute from "./api/UserRoute.js"
import PlaceRoute from "./api/PlaceRoute.js"
import ActivityRoute from "./api/ActivityRoute.js"
import FeatureRoute from "./api/FeatureRoute.js"
import TestimonialRoute from "./api/TestimonialRoute.js"
import CategoryRoute from "./api/CategoryRoute.js"
import CategoryItemRoute from "./api/CategoryItemRoute.js"

app.use('/users', UserRoute)
app.use('/places', PlaceRoute)
app.use('/activities', ActivityRoute)
app.use('/features', FeatureRoute)
app.use('/testimonial', TestimonialRoute)
app.use('/category', CategoryRoute)
app.use('/category-item', CategoryItemRoute)

module.exports = app