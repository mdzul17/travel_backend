require('dotenv').config()

let express = require('express')
let app = express()
let bodyParser = require("body-parser")
const cors = require("cors")
let apiRoute = require('./routes/api')

const port = process.env.APP_PORT || 1337

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use('/api/v1', apiRoute)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})