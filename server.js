const express = require('express')
const cors = require("cors")
var bodyParser = require('body-parser')
const mysql = require('mysql')
require('dotenv').config({path: './.env'})

//connect to your data base
const db = mysql.createConnection({
    host:'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  })
db.connect(()=>{
   console.log(`connect to your database ${process.env.DATABASE}`)
})

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

//ceate table 'post' in the database 
app.post('/createTable',(req,res)=>{
    let sql = `CREATE TABLE post (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(45) NULL,
        description VARCHAR(45) NULL,
        date DATE NULL,
        category VARCHAR(45) NULL,
        PRIMARY KEY (id));`
    db.query(sql,(err)=>{
        if(err)
            throw err
        res.send({success: true})
    })
})
