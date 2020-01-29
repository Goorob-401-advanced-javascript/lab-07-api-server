'use strict';

const express = require('express');
const app = express();
const logRequest = require('./logger.js');


app.use(express.json());
app.get('/fruit' ,(req , res)=>{
  console.log('req obj :' , req.query)
  let output ={
    type: req.query.type ,
    hisWorked: true ,
  }
  res.status(200).json(output);
});

app.post('/fruit' , (req , res)=>{
  console.log('req body :' , req.body);
  res.status(201).send('item added');
})
//  middleware 

function square(n){
  return (req , res , next)=>{
    if (typeof n !== 'number'){
      next('not a number');
    }else {
      req.number = n*n ;
      next();
    }
  }
}

function errorHandler(err , req ,res , next) {
  res.status(500);
  res.statusMassage = 'Generic Server Error !' ;
  res.json({error : err });  
}

function notFoundHandler(req ,res ,next) {
  res.status(404);
  res.statusMassage='Not Found!';
  res.json({error : 'Not Found !'})
}

app.get('/rm' , square(10) ,(req , res)=>{
  let output ={
    number : req.number
  }
  res.status(200).json(output);
})



module.exports = {
    server: app,
    start: port => {
      let PORT = port || process.env.PORT || 3000;
      app.listen(PORT, () => console.log(`listening on ${PORT}`));
    }
  }

