const ping = require('ping');

const hosts = [
  'fra-de-ping.vultr.com',
  'ams-nl-ping.vultr.com',
  'par-fr-ping.vultr.com',
  'lon-gb-ping.vultr.com',
  'sgp-ping.vultr.com',
  'hnd-jp-ping.vultr.com',
  'nj-us-ping.vultr.com',
  'il-us-ping.vultr.com',
  'ga-us-ping.vultr.com',
  'wa-us-ping.vultr.com',
  'fl-us-ping.vultr.com',
  'tx-us-ping.vultr.com',
  'sjo-ca-us-ping.vultr.com',
  'lax-ca-us-ping.vultr.com',
  'syd-au-ping.vultr.com'
];

let doPing = () => {
  return hosts.map((host) => {
    return ping.promise.probe(host)
      .then((res) => {
        console.log('event: ping\r\n');
        console.log(`data: ${JSON.stringify(res)}\r\n`);
        console.log("\r\n");
      }).catch((err) => {
        console.log('event: error\r\n');
        console.log(`data: host: ${host}; ${JSON.stringify(err)}\r\n`);
        console.log("\r\n");
      });
  });
};

let tid = null;

let run = () => {
  Promise.all(doPing()).then(() => {
    tid = setTimeout(run, 3000);
  });
};

run();
