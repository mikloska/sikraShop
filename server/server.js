const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose');

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
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Catch-all to unknown routes (404)
app.use((req,res) => res.status(404).send('not found'))
//Start Server
const port = process.env.PORT || 3000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> console.log('connected to db'))
  .catch(err => console.log(err))

app.listen(port, ()=> console.log(`Listening on ${port}`))

mongoose.set('useFindAndModify', false)
