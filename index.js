require('dotenv').config()

let app = require('./routes/api')
let bodyParser = require("body-parser")
const cors = require("cors")

const port = process.env.APP_PORT || 1337

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})