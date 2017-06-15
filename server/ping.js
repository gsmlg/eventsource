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

const hostsMap = {
  'fra-de-ping.vultr.com': '法兰克福',
  'ams-nl-ping.vultr.com': '阿姆斯特丹',
  'par-fr-ping.vultr.com': '巴黎',
  'lon-gb-ping.vultr.com': '伦敦',
  'sgp-ping.vultr.com': '新加坡',
  'hnd-jp-ping.vultr.com': '东京',
  'nj-us-ping.vultr.com': '新泽西',
  'il-us-ping.vultr.com': '芝加哥',
  'ga-us-ping.vultr.com': '亚特兰大',
  'wa-us-ping.vultr.com': '西雅图',
  'fl-us-ping.vultr.com': '迈阿密',
  'tx-us-ping.vultr.com': '达拉斯',
  'sjo-ca-us-ping.vultr.com': '硅谷',
  'lax-ca-us-ping.vultr.com': '洛杉矶',
  'syd-au-ping.vultr.com': '悉尼',
}

module.exports = (app) => {
  app.get('/ping', (req, res) => {
    res.set({
      "Content-Type": "text/event-stream"
    });

    let stop = false;

    let doPing = () => {
      return hosts.map((host) => {
        return ping.promise.probe(host)
          .then((info) => {
            info.name = hostsMap[info.host];
            info.date = new Date();
            res.write('event: ping\r\n');
            res.write(`data: ${JSON.stringify(info)}\r\n`);
            res.write("\r\n");
          }).catch((err) => {
            res.write('event: error\r\n');
            res.write(`data: host: ${host}; ${JSON.stringify(err)}\r\n`);
            res.write("\r\n");
          });
      });
    };

    let tid = null;

    let run = () => {
      Promise.all(doPing()).then(() => {
        if (stop) return ;
        tid = setTimeout(run, 3000);
      });
    };

    run();

    req.on('close', () => { clearTimeout(tid); stop = true; });
  });
};
