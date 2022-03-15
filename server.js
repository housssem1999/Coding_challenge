const express = require('express')
const cors = require("cors")
var bodyParser = require('body-parser')

//configure the cors
const corsOptions ={
    origin: "*"
}

//configure app
const app = express()
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors(corsOptions))

//run server
app.listen(3000, ()=>{
    console.log('listenning to port 3000')
})
