const data = require('../../fixtures/products.json');

module.exports = (req, res) => {
  allProducts = data;
  res.status(200).json({ allProducts });
};