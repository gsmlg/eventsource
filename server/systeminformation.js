const si = require('systeminformation');

module.exports = (app) => {
  app.get('/systeminformation', function(req, res) {
    let apis =  Object.keys(si);
    res.json(apis);
  });

  app.get('/systeminformation/:command', function(req, res) {
    let {command} = req.params;
    si[command]().then(data => {
      res.json(data);
    });
  });

};
