// setup express
const express = require('express');
const app = express();
const PORT = process.env.PORT = 5000

// import other needed libraries
const _ = require('lodash');
const fs = require('file-system')

// pathname ynap-react-express
let path = require('path');
let rootPath = path.normalize(__dirname);

// data
const allProducts = require(rootPath +'/fixtures/products.json').data

//////// ROUTES ////////////////////////////////////////

// setup routes
let product = express.Router();
let products = express.Router();
let designers = express.Router();

// fetch individual product by id
product.get('/:id', (req, res) => {
  let requestedId = Number(req.params.id);
  let productObj = _.find(allProducts, {'id': requestedId });
  let body;

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

// fetch all products V2 WITH SORT ** UPDATE FOR INCLUDING DESIGNER
products.get('/', function (req, res) {
  let designer = req.query.designer
  let order = req.query.order
  let offset = parseInt(req.query.offset) || 0;
  let limit = parseInt(req.query.limit) || 60;

  let results = allProducts
  let total = results.length;

  // RETURNS ALL PRODUCTS BY DESIGNER QUERY PARAMS
  if (designer != undefined) {
    console.log(`Designer value: ${designer}`)
    results = _.filter(results, 
      { brand: {name: {en: designer}}}   
    )
  }

  // RETURNS ALL PRODUCTS BY PRICE SORTORDER PARAMS
  if (typeof order == "string") {
    console.log(`Price order: ${order}`)
    results = _.orderBy(results, 'price.gross', order)
  }

  if (offset > total) {
      return res.type('json').sendStatus(400);
  }

  res.json({
      offset: offset,
      limit: limit,
      total: results.length,
      data: results.slice(offset, offset+limit).map(function(product) {
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

// fetch a list of all designers
designers.get('/designers', function (req, res) {
  let uniqDes = _.uniqBy(allProducts, 'brand.name.en')
  let uniqDesArr = uniqDes.map((obj) => obj.brand.name.en).sort()
  res.json({uniqDesArr});
});

// use routes
app.use('/api/product', product)
app.use('/api/products', products)
app.use('/api', designers)

// link to main html
app.get("*", function(req, res) {
  fs.readFile("./client/public/index.html", "utf8", function(err, data) {
     res.send(data);
  });
});

app.use(function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

console.log(rootPath)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

