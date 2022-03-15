const express = require('express')
const cors = require("cors")
var bodyParser = require('body-parser')
const mysql = require('mysql')
require('dotenv').config({path: './.env'})
const {check, validationResult} = require('express-validator')
const isValidDate = require('./isVlidateDate')

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

//api
///*first api: add your todo list 
///adding input validation 
  app.post('/create',
    [
        check('title').notEmpty().withMessage("title cannot be empty"),
        check('description').notEmpty().withMessage("description cannot be empty"),
        check('category').notEmpty().withMessage("category cannot be empty"),
        check("date").custom(isValidDate).withMessage("invalid date")
    ], async (req, res)=>{
        var {title, description, date, category} = req.body
        const errors = validationResult(req)
        const msg ={}
        errors.errors.forEach(element => {msg[element.param] = element.msg })

        if(!errors.isEmpty()){
            return res.status(400).json({success: false, message: msg})
        }
        const sql = `insert into post 
            (title, description, date, category) values 
            ('${title}','${description}','${date}','${category}')`
            const create = await db.query(sql,err =>{
                if(err)
                    res.status(400).json({success: false, message: err.messsage})
                res.status(201).json({success: true, message: "Created post"})
            })
  })