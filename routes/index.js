const routes = require('express').Router();
const products = require('./products')

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});


routes.use('/api/products', products);

module.exports = routes;