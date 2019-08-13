// setup express
const express = require('express');
const app = express();
const port = 5000;
var _ = require('lodash');

// pathname ynap-react-express
var path = require('path');
var rootPath = path.normalize(__dirname);

console.log(rootPath)
app.listen(port, () => console.log(`Server started on port ${port}`))

// fetch all products
var allProducts = require(rootPath +'/fixtures/products.json').data

app.get('/api/products', function (req, res, next) {
  var total = allProducts.length;
  var offset = parseInt(req.query.offset) || 0;
  var limit = parseInt(req.query.limit) || 60;
  if (offset > total) {
      return res.type('json').sendStatus(400);
  }

  res.json({
      offset: offset,
      limit: limit,
      total: total,
      data: allProducts.slice(offset, offset+limit).map(function(product) {
          // Simplify payload - more data available in fixture
          return {
              id: product.id,
              name: product.name.en,
              price: product.price.gross / product.price.divisor,
              designer: product.brand.name.en,
              image: {
                  outfit: '//cache.net-a-porter.com/images/products/'+product.id+'/'+product.id+'_ou_sl.jpg'
              }
          }
      })
  })
})

// fetch individual product by id
app.get('/api/product/:id', function (req, res) {

  var requestedId = Number(req.params.id);
  var productObj = _.find(allProducts, {'id': requestedId });

  var body;

  if (productObj) {
      body = {
          id: productObj.id,
          name: productObj.name.en,
          price: productObj.price.gross / productObj.price.divisor,
          designer: productObj.brand.name.en,
          onSale : productObj.onSale,
          sizes: productObj.saleableStandardSizes,
          badges: productObj.badges,
          images: {
              outfit: '//cache.net-a-porter.com/images/products/'+productObj.id+'/'+productObj.id+'_ou_sl.jpg',
              small: '//cache.net-a-porter.com/images/products/'+productObj.id+'/'+productObj.id+'_in_sl.jpg',
              large: '//cache.net-a-porter.com/images/products/'+productObj.id+'/'+productObj.id+'_in_pp.jpg'
          }
      };
  } else {
      body = {error: 'pid not found'}
  };

  res.json(body);
});


// // fetch individual product by id
// app.get('/api/product/:filter/:order', function (req, res) {

//   // diff vars:
//   // filter: designer, price, 
//   // order: asc, desc

//   var filter = req.params.filter
//   var order = req.params.order
//   var productObj = _.find(allProducts, {'id': requestedId });

//   var body;

//   if (productObj) {
//       body = {
//           id: productObj.id,
//           name: productObj.name.en,
//           price: productObj.price.gross / productObj.price.divisor,
//           designer: productObj.brand.name.en,
//           onSale : productObj.onSale,
//           sizes: productObj.saleableStandardSizes,
//           badges: productObj.badges,
//           images: {
//               outfit: '//cache.net-a-porter.com/images/products/'+productObj.id+'/'+productObj.id+'_ou_sl.jpg',
//               small: '//cache.net-a-porter.com/images/products/'+productObj.id+'/'+productObj.id+'_in_sl.jpg',
//               large: '//cache.net-a-porter.com/images/products/'+productObj.id+'/'+productObj.id+'_in_pp.jpg'
//           }
//       };
//   } else {
//       body = {error: 'pid not found'}
//   };

//   res.json(body);
// });

