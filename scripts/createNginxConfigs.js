/* eslint-disable */

const fs = require('fs');
const path = require('path');

const DOMAINS = require('../services');

const dir = path.join(__dirname, '..', 'nginx', 'configs');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// TODO delete contents of configs folder

Object.keys(DOMAINS).forEach(domain => {
  let template = fs.readFileSync(
    path.join(__dirname, '..', 'nginx', 'config_template.tmpl'),
    { encoding: 'utf8' }
  );

  template = template.replace(/%DOMAIN%/g, domain);

  const regex = /%LOCATION_BEGIN%([^]*?)%LOCATION_END%/gm;
  const greedy = /%LOCATION_BEGIN%([^]*)%LOCATION_END%/m;
  // const locationTemplate = template.match(regex)[1].match(greedy)[1];
  const locationTemplate = template.match(greedy)[1];

  locations = '';

  DOMAINS[domain].forEach((service) => {
    const port = service.port || 3000;
    const location = service.location || '/';
    const https = service.https || true;

    let locationCopy = locationTemplate + '';

    locationCopy = locationCopy.replace(/%PORT%/g, port);
    locationCopy = locationCopy.replace(/%LOCATION%/g, location);
    locationCopy = locationCopy.replace(/%SERVICE%/g, service.service);

    locations += locationCopy;
  });

  template = template.replace(regex, locations);

  fs.writeFile(
    path.join(__dirname, '..', 'nginx', 'configs', domain + '.conf'),
    template,
    (err, result) => {
      if (err) console.error(err);
    }
  );
});
