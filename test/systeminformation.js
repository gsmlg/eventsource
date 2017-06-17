const si = require('systeminformation');
const _ = require('underscore');

let {log} = console;

let apis =  Object.keys(si);

apis.forEach((api) => {
  log(api);
});

//si.getDynamicData(log);
