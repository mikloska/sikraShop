// const path = require('path');
// const express = require('express');
// const dotenv = require('dotenv').config();
// const app = express();
// const PORT = process.env.PORT || 3000;
// const products = require(path.resolve(__dirname, './data/products'))
import path from 'path'
import "@babel/polyfill"
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
//colorizes terminal
import colors from 'colors'
//Database connection
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import promoRoutes from './routes/promoRoutes.js'
import {notFound, errorHandler} from './middleware/errorHandler.js'
import uploadRoutes from './routes/uploadRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import morgan from 'morgan'

// import nodemailer from 'nodemailer'
// import passport from 'passport'
// import session from 'express-session'
// import passportConfig from "./config/passport";
// import { default as connectMongoDBSession} from 'connect-mongodb-session';
// const MongoDBStore = connectMongoDBSession(session);

dotenv.config();
connectDB()
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000;
//Needed to be able to use JSON data in request body
app.use(express.json())

// app.get('/', (req, res) => res.send('API is running'));
app.use('/api/email', emailRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/promocode', promoRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
app.use('/api/images', uploadRoutes)

// app.use(express.urlencoded({extended:true}))
// app.use(
//     session({
//       secret: 'keyboard cat',
//       resave: false,
//       saveUninitialized: false,
//       store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     })
//   )
  // Passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

// statically serve everything in the build folder on the route '/build'
const __dirname = path.resolve()
// app.use('/build', express.static(path.join(__dirname, '/build')));
// app.use('/build', express.static('../build'));

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
const root = path.join(__dirname, 'build')
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      if(req.header('host').includes('www')) {
        res.redirect(`https://${req.header('host')}${req.url}`)
      } else{
        res.redirect(`https://www.${req.header('host')}${req.url}`)
      }
    else
      next()
  })
  // console.log('In production')
  app.use(express.static(root))

  app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });


//Start Server


//Error handling
//Error handling for non-existant routes
// Catch-all to unknown routes (404)
app.use(notFound)
app.use(errorHandler)
app.use((req,res) => res.status(404).send('not found'))

//This has has been moved to db.js
// mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//   .then(()=> console.log('connected to db'))
//   .catch(err => console.log(err))

app.listen(PORT, ()=> console.log(`Server running in '${process.env.NODE_ENV}' mode on port ${PORT}`.yellow.bold))

// mongoose.set('useFindAndModify', false)
