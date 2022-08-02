const fs = require('fs');
const path = require('path');
const colors = require('colors');

/**
 * Go through the repos/services and check that settings.json files
 * exist for each repo. If they do not, copy over settings.example.json
 * to settings.json.
 *
 * Warn the user that a settings.json file has been created for them
 */

/* eslint-disable */
const base = path.resolve(path.join(__dirname, '..', 'repos', 'services'));
const services = fs.readdirSync(base).filter(f => fs.statSync(`${base}/${f}`).isDirectory());

services.forEach(serviceFolder => {
  const settingsPath = path.join(base, serviceFolder, 'settings.json');
  const settingsExamplePath = path.join(base, serviceFolder, 'settings.example.json');

  if (!fs.existsSync(settingsPath) && fs.existsSync(settingsExamplePath)) {
    console.warn(` ⚠️\t${colors.yellow(`Creating a settings.json file in ${base}/${serviceFolder}`)}`);

    fs.createReadStream(settingsExamplePath).pipe(fs.createWriteStream(settingsPath));
  }
});
