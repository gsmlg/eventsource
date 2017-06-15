var util = require('util');
var si = require('systeminformation');

// promises style - new in version 3
si.getStaticData()
  .then(data => console.log(util.inspect(data, {depth: 10, colors: true})))
  .catch(error => console.error(error));
