const {exec} = require('child_process');

module.exports = (app) => {
  let msgid = 0;
  let messages = [];

  app.get('/pid', (req, res) => {
    res.set({
      "Content-Type": "text/event-stream"
    });

    // let proc = exec('pidstat -lurdh 5');
    let proc = exec('iostat 5');

    proc.stdout.on('data', (out) => {
      let pid = new Buffer(out).toString('base64');
      res.write('event: update\r\n');
      res.write(`data: ${pid}\r\n\r\n`);
    });

    req.once('close', ()=> proc.kill() );
  });

};
