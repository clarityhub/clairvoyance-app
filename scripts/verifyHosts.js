const fs = require('fs');
const path = require('path');
const colors = require('colors');

/**
 * Check that your /etc/hosts are correct
 */

/* eslint-disable */
const DOMAINS = require('../services');

DOMAINS['shrimp.pimp'] = [{
  service: 'shrimp.pimp',
}];

const ETC = '/etc/hosts';
const dir = path.join(__dirname, '..', 'nginx', 'configs');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

threwWarning = false;

Object.keys(DOMAINS).forEach(domain => {
  fs.readFile(ETC,
    { encoding: 'utf8' },
    function (err, data) {
      if (err) throw err;

      if (data.indexOf(domain) === -1) {
        if (process.getuid && process.getuid() === 0) {
          fs.appendFile(
            ETC,
            `\n127.0.0.1\t${domain}`,
            function (err) {
              if (err) throw err;
              console.log(` 🎉\t${colors.green(`Added ${domain} to /etc/hosts`)}`);
            });
        } else {
          console.warn(` ⚠️\t${colors.yellow(`${domain} is missing from your hosts file`)}`);

          threwWarning = true;
        }
      }
    }
  );
});

process.on('exit', function () {
  if (threwWarning) {
    console.log('');
    console.log(` 🚨\tRun ${colors.green('sudo yarn run verify-hosts')} to automatically add missing hosts`);
  }
});
