/// <reference path="./types/index.d.ts" />
import express from 'express'
import 'dotenv/config'
import webRoutes from './routes/web'
import getConnection from './config/database'
import initDatabase from './config/seed'
import passport from 'passport'
import configPassportLocal from './middleware/passport.local'
import session from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
const app = express()



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//config view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')





//config static files
app.use(express.static("public"))


//config session express-session
app.use(session({
    // secret: 'keyboard cat',
    // resave: false,
    // saveUninitialized: true
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 1 * 24 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());


// config global middleware
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})


// config routes
webRoutes(app);


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