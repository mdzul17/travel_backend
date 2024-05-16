require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'

let app = express()
let apiRoute = require('./routes/api')

const port = process.env.APP_PORT || 1337

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())
app.use('/api/v1', apiRoute)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})