var util = require('util');
var si = require('systeminformation');

var displayOptions = {depth: 10, colors: false};

// promises style - new in version 3
si.getStaticData()
  .then(data => console.log(util.inspect(data, displayOptions)))
  .catch(error => console.error(error));

si.getDynamicData()
  .then(data => console.log(util.inspect(data, displayOptions)))
  .catch(error => console.error(error));
