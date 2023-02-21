'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log('Express, Mongoose API listening port: ', PORT);
});

// localhost:3000/productsapi endpoint - 
app.get('/productsapi', getAllMakeup);