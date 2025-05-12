// const express = require('express')
import express from 'express'
import 'dotenv/config'
import webRoutes from './routes/web'
import getConnection from './config/database'
const app = express()

//config view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// config routes
webRoutes(app);

// app.get('/', (req, res) => {
//     res.send('Hello World! 1')
// })

//config static files
app.use(express.static(__dirname + '/public'))

getConnection()

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})