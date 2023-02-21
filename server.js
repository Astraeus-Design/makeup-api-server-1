'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// import route handlers
const getAllMakeup = require('./handlers/makeup');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log('Express, Mongoose API listening port: ', PORT);
});

// localhost:3000/productsapi endpoint -
app.get('/productsapi', getAllMakeup);

/***
 * Database stuff
 * collection products is in test
 */

mongoose.connect('mongodb://localhost:27017', {
  //useNewUrlParser: true,
  //strictQuery: false
});
// create a schema
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  imageUrl: String,
  description: String,
});

const productModel = mongoose.model('products', productSchema);

function seedDatabase() {
  const makeup1 = new productModel({
    name: 'Lippie Pencil',
    brand: 'colourpop',
    price: 5.0,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769',
    description:
      'Lippie Pencil A long-wearing and high-intensity lip pencil that glides on easily and prevents feathering. Many of our Lippie Stix have a coordinating Lippie Pencil designed to compliment it perfectly, but feel free to mix and match!',
  });

  const makeup2 = new productModel({
    name: 'Rouge Dior Double Rouge',
    brand: 'Dior',
    price: 27.5,
    imageUrl:
      'https://www.dior.com/beauty/version-5.1432748111912/resize-image/ep/0/390/100/0/packshots%252FPDG_y0027279.jpg',
    description:
      'Inspired by professional techniques, Double Rouge combines two makeup trends: matte and metal.',
  });

  const makeup3 = new productModel({
    name: 'Rouge Dior Liquid',
    brand: 'Dior',
    price: 26.5,
    imageUrl:
      'https://www.dior.com/beauty/version-5.1432748111912/resize-image/ep/0/390/100/0/packshots%252FPDG_y0027269.jpg',
    description:
      'Rouge Dior has yet again been reinvented with the first liquid lipstick formula by Dior with multiple effects and surprising colour impact. Coverage, 12h* long wear and comfort: a true gem available in 3 vibrant finishes matte, metal and satin.',
  });

  const makeup4 = new productModel({
    name: 'Corrective Concealer Clay',
    brand: 'Iman',
    price: 10.0,
    imageUrl:
      'http://imancosmetics.com/resources/uploads/product_colors/85a2fea7e732950138372ef267748a36.jpg',
    description:
      '0.17 oz Silky and creamy formula smoothes on, covering dark circles, and tiny imperfections.',
  });

  // save the documents to the table (collection)
  makeup1.save();
  makeup2.save();
  makeup3.save();
  makeup4.save();
}

// run the seeder
//seedDatabase();

const getMakeupsFromDB = (req, res) => {
  productModel.find({}, function (error, makeupArray) {
    if (error) {
      console.error('DB error: ' + error);
    } else {
      res.status(200).send(makeupArray);
    }
  });
};

// get all makeup products from mongodb
app.get('/product', getMakeupsFromDB);
