const EventEmitter = require('events');
const child_process = require('child_process');
const {execSync} = child_process;

module.exports = (app) => {
  app.get('/ifconfig', (req, res) => {
    // console.log("connected: ", req.path);
    // console.log("headers: ", req.headers);
    res.set({
      "Content-Type": "text/event-stream"
    });

    let ifconfig = () => {
      let msg = execSync('ifconfig');
      res.write(`data: ${msg.toString('base64')}`);
      res.write("\r\n\r\n");
    };

    ifconfig();

    let tid = setInterval(ifconfig, 5000);

    req.once('close', () => clearInterval(tid));

  });

};
