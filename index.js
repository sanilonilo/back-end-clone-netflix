const express = require('express')
const app = express()
const consign = require('consign')
const db = require('./db/db')

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./config/msgs.js') 
    .then('./apis')
    .then('./routes/routes.js')
    .into(app)

app.listen(3333,() => console.log('Back rodando...'))    
