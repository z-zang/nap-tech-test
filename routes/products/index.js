var products = require('express').Router();
// const all = require('./all');
var allProducts = require('../../fixtures/products.json').data;

products.get('/', allProducts);
app.get('/', function(req, res) {
  //callback
});
module.exports = {
  products: products
}

