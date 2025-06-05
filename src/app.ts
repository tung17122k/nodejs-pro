// const express = require('express')
import express from 'express'
import 'dotenv/config'
import webRoutes from './routes/web'
import getConnection from './config/database'
import initDatabase from './config/seed'
import passport, { session } from 'passport'
import configPassportLocal from './middleware/passport.local'
const app = express()



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//config view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// config routes
webRoutes(app);

// app.get('/', (req, res) => {
//     res.send('Hello World! 1')
// })

//config static files
app.use(express.static("public"))

app.use(passport.initialize());

getConnection()

// seeding database
initDatabase()




configPassportLocal();

//handle 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404 Not Found' });
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})