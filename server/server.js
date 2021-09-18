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
import {notFound, errorHandler} from './middleware/errorHandler.js'
import uploadRoutes from './routes/uploadRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import morgan from 'morgan'
import nodemailer from 'nodemailer'

dotenv.config();
connectDB()
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000;
//Needed to be able to use JSON data in request body
app.use(express.json())

app.get('/', (req, res) => res.send('API is running'));
app.post('/send',(req,res)=>{
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'info@sikrajewelry.com',
        pass: process.env.PW
    }
  });
  let mailOptions = {
    from: '"Our Code World " info@sikrajewelry.com', // sender address (who sends)
    to: 'mikloska973@gmail.com', // list of receivers (who receives)
    subject: 'Hello ', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
  })
  res.send('sent')
})
app.use('/api/email', emailRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
app.use('/api/upload', uploadRoutes)
//Error handling
//Error handling for non-existant routes
app.use(notFound)
app.use(errorHandler)


// statically serve everything in the build folder on the route '/build'
// app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/build', express.static('../build'));
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });


//Start Server



// Catch-all to unknown routes (404)
app.use((req,res) => res.status(404).send('not found'))

//This has has been moved to db.js
// mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//   .then(()=> console.log('connected to db'))
//   .catch(err => console.log(err))

app.listen(PORT, ()=> console.log(`Server running in '${process.env.NODE_ENV}' mode on port ${PORT}`.yellow.bold))

// mongoose.set('useFindAndModify', false)
