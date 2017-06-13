const http = require('http');
const express = require('express');
const app = express();
const setup = require('./middlewares/frontendMiddleware');
const server = http.createServer(app);

setup(app, {});
// app.use(express.static(__dirname + '/public'));

server.listen(3000);

app.get('/messages', (req, res) => {
  console.log("connected: ", req.path);
  console.log("headers: ", req.headers);
  res.set({
    "Content-Type": "text/event-stream"
  });
  let id = 0;
  res.write(`id: ${++id}\n`);
  res.write("event: update\n");
  res.write("data: "+JSON.stringify([{text: "Hi!"}, {text: "OK!"}, {text: "Ha Ha Ha"}]));
  res.write("\n\n");
  setInterval(() => {
    res.write(`id: ${++id}\n`);
    res.write("event: add\n");
    res.write("data: Now is the time at "+ new Date().toISOString());
    res.write("\n\n");
  }, 10000);
});

app.get('/*', (req, res, next) => {
  console.log(req.path);
});
