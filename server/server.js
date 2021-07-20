// const path = require('path');
// const express = require('express');
// const dotenv = require('dotenv').config();
// const app = express();
// const PORT = process.env.PORT || 3000;
// const mongoose = require('mongoose');
// const products = require(path.resolve(__dirname, './data/products'))
import "@babel/polyfill"
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import products from './data/products.js'
//colorizes terminal
import colots from 'colors'
//need this for async await
// import "core-js/stable";
// import "regenerator-runtime/runtime"
import connectDB from './config/db.js'

dotenv.config();
connectDB()
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// Route Handlers
//Default Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// statically serve everything in the build folder on the route '/build'
// app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/build', express.static('../build'));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });
app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product=products.find(p=>p._id===req.params.id)
  res.json(product)
});


// Catch-all to unknown routes (404)
app.use((req,res) => res.status(404).send('not found'))
//Start Server

// mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//   .then(()=> console.log('connected to db'))
//   .catch(err => console.log(err))

app.listen(PORT, ()=> console.log(`Server running in '${process.env.NODE_ENV}' mode on port ${PORT}`.yellow.bold))

// mongoose.set('useFindAndModify', false)
