const http = require('http');
const express = require('express');
const app = express();
const setup = require('./middlewares/frontendMiddleware');
const server = http.createServer(app);
const EventEmitter = require('events');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

setup(app, {});

server.listen(3000);

let msgid = 0;
let messages = [];

app.get('/messages', (req, res) => {
  // console.log("connected: ", req.path);
  // console.log("headers: ", req.headers);
  res.set({
    "Content-Type": "text/event-stream"
  });
  res.write(`id: ${msgid}\n`);
  res.write("event: update\n");
  res.write(`data: ${JSON.stringify(messages)}`);
  res.write("\n\n");

  let listener = (msg) => {
    res.write(`id: ${msgid}\n`);
    res.write("event: add\n");
    res.write(`data: ${JSON.stringify(msg)}`);
    res.write("\n\n");
  };

  evt.addListener('new.message', listener);

  req.once('close', ()=> evt.removeListener('new.message', listener));
});

app.post('/add-messages', (req, res) => {
  let text = req.body.text;
  let time = new Date();
  let msg = {text, time};
  msgid++;
  messages.push(msg);
  evt.emit('new.message', msg);
  res.status(204);
  res.end();
});

app.get('/*', (req, res, next) => {
  console.log(req.path);
  res.status(404);
  res.end();
});


const evt = new EventEmitter();
