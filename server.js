const express = require('express');
const app = express();
const port = 8080;
// .js file extension can be removed without issue
const router = require('./app/routes');

// Middleware to require files
app.use('/', router);

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`I am listening on port ${port}.`);
});
