'use strict';

const express = require('express');
const app = express();
const logRequest = require('./logger.js');
const Model = require('../models/memory-data-model')
const model = new Model ;
app.use(express.json());


app.use(timeStamp);
app.use(logRequest);



  function timeStamp(req , res , next ){
    let time = new Date() ;
    req.requestTime = time ;
    next();
  }

function errorHandler(err , req ,res , next) {
  res.status(500);
  res.statusMassage = ' Error !' ;
  res.json({error : err });
}

function notFoundHandler(req ,res ,next) {
  res.status(404);
  res.statusMassage='Not Found 404!';
  res.json({error : 'Not Found !'})
}
app.get('/real-error' , (req , res ) => {
   throw new Error('my first real error');
});


let db = [];

app.get('/api/v1/products', (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ 'count ' : count, 'results': results });
});

app.get('/api/v1/products/:id', (req ,res , next)=>{
  let id = req.params.id ;
  model.get(id);
  let record = db.filter((record)=> record.id === parseInt(id));
  res.json(record);
});

app.post('/api/v1/products' , (req,res, next) =>{
  let {category} = req.body ;
  let record ={category} ;
  record.id = db.length +1;
  model.create(record , record.id);
  db.push(record);
  res.status(201);
  res.json(record);
});
app.put('/api/v1/products/:id', (req, res, next) => {
  let idToUpdate = req.params.id;
  let { category, id } = req.body;
  let updatedRecord = { record, id };
  db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
});
app.delete('/api/v1/products/:id' ,(req , res ,next )=>{
  let id = req.params.id ;
  model.delete(id);
  db = db.filter((record) => record.id !== parseInt(id));
  res.json({ msg: ' item deleted'});
});

app.get('/api/v1/categories', (req, res, next) => {
  let count = db.length;
  let results = db;
  res.status(200).json({ 'count ' : count, 'results': results });
});

app.get('/api/v1/categories/:id', (req ,res , next)=>{
  let id = req.params.id ;
  model.get( id);
  let record = db.filter((record)=> record.id === parseInt(id));
  res.status(200).json(record);
});

app.post('/api/v1/categories' , (req,res, next) =>{
  let {category} = req.body ;
  let record ={category} ;
  record.id == db.length +1;
  model.create(record , record.id);
  db.push(record);
  res.status(201);
  res.json(record);
});
app.put('/api/v1/categories/:id', (req, res, next) => {
  let idToUpdate = req.params.id;
  let { category, id } = req.body;
  let updatedRecord = { record, id };
  db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
});
app.delete('/api/v1/categories/:id' ,(req , res ,next )=>{
  let id = req.params.id ;
  model.delete(id);
  db = db.filter((record) => record.id !== parseInt(id));
  res.json({ msg: ' item deleted'});
});

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  }
}

