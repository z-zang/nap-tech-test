// setup express
const fs = require('file-system')
const express = require('express');
var cors = require('cors');
const app = express();
const port = 5000;
var _ = require('lodash');

// pathname ynap-react-express
var path = require('path');
var rootPath = path.normalize(__dirname);
console.log(__dirname)

app.use(cors());


app.use(express.static("public"));
app.get("*", function(req, res) {
    fs.readFile("./client/public/index.html", "utf8", function(err, data) {
       res.send(data);
    });
});


  app.use(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  });

// app.listen(5000);

// app.use('./static', express.static('static'))
// app.use(handleRender)

// app.get('*', (req, res) => {
//   const raw =`
//   <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <title>Title</title>
//       </head>
//       <body>
      
//       <div id="app"></div>
//       <script src="dist/bundle.js"></script>
//       </body>
//       </html>
//   `;

//   res.send(raw);
// });

// // We are going to fill these out in the sections to follow
// function handleRender(req, res) {
//   /* ... */
// }
// function renderFullPage(html, preloadedState) {
//   /* ... */
// }

console.log(rootPath)
app.listen(port, () => console.log(`Server started on port ${port}`))




// all products
var allProducts = require(rootPath +'/fixtures/products.json').data

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

// fetch all products V2 WITH SORT
// example: api/products?offset=60&limit=70

/*
  designer params
    designer: designer name

  sort params
    price: price.gross
    designer: brand.name.en
*/

app.get('/api/products', function (req, res) {
  var designer = req.query.designer
  var sort = req.query.sort
  var order = req.query.order

  // temp check for designer
  if (typeof sort == "string" && typeof order == "string") {
    console.log
    (`Has sort and order params
    sort: ${sort}
    order: ${order}`)

    // all info is present, this means that it can be ordered
    allProducts = _.orderBy(allProducts, sort, order)

  } else {
    console.log
    (`No sort/order params
    sort: ${sort}
    order: ${order}`)
  }

  // temp check for sort
  if (typeof sort == "string" && typeof order == "string") {
    console.log
    (`Has sort and order params
    sort: ${sort}
    order: ${order}`)

    // all info is present, this means that it can be ordered
    allProducts = _.orderBy(allProducts, sort, order)

  } else {
    console.log
    (`No sort/order params
    sort: ${sort}
    order: ${order}`)
  }

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

// fetch all products from a certain designer
app.get('/api/designer/:designer', function (req, res) {

  var designer = req.params.designer;
  var results = _.filter(allProducts, 
    {
      brand: {
        name: {
          en: "CLU"
        }
      }
    })
  
  // console.log(designer)
  // console.log("allprodcuts", results)
  // ^ ABOVE IS WORKING
  
  var total = allProducts.length;
  var offset = parseInt(req.query.offset) || 0;
  var limit = parseInt(req.query.limit) || 60;

  if (offset > total) {
      return res.type('json').sendStatus(400);
  }

  var body = {
    offset: offset,
    limit: limit,
    total: total,
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
  }; 

  res.json(body);
});