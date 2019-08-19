# YNAP TECH TEST
## Summary
- To install modules: `yarn install` and then `yarn install-client`
- To run: `yarn server` in root directory and then `yarn client` in a new terminal tab 
- Client is on `localhost:3000`, server is on `localhost:5000`
- Uses Express backend (default) and React frontend
  - I set up the Express files from scratch as I found it difficult to remove handlebars from the file(s) in the original

## Features
- Pagination
- Individual product listing page
- Filter by designer and/or order by price
- Responsive

## Issues
- I tried to add some tests, but react-router made it a bit more complex than I was able to deal with so the tests aren't working right now
- CSS - PLP items get stretched to width of container instead of retaining size