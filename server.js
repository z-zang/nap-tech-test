// setup express
const express = require('express');
const app = express();
const port = 5000;

// pathname ynap-react-express
var path = require('path');
var rootPath = path.normalize(__dirname);

console.log(rootPath)

app.listen(port, () => console.log(`Server started on port ${port}`))



// fetch products

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
