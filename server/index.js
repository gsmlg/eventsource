const http = require('http');
const express = require('express');
const app = express();
const setup = require('./middlewares/frontendMiddleware');
const server = http.createServer(app);
const EventEmitter = require('events');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./systeminformation')(app);

setup(app, {});

server.listen(3000);

app.get('/*', (req, res, next) => {
  console.log(req.path);
  res.status(404);
  res.end();
});
