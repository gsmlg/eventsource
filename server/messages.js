const EventEmitter = require('events');

module.exports = (app) => {
  let msgid = 0;
  let messages = [];
  let evt = new EventEmitter();

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

};
