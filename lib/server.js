'use strict';

const express = require('express');
const app = express();
const logRequest = require('./logger.js');
// let PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(logRequest);
// app.listen(PORT, () => console.log(`listening on ${PORT}`));


module.exports = {
    server: app,
    start: port => {
      let PORT = port || process.env.PORT || 3000;
      app.listen(PORT, () => console.log(`listening on ${PORT}`));
    }
  }


