/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
async function updateBanners() {
  try {
    const fetch = require('node-fetch');
    const path = require('path');
    const fs = require('fs');
    const dateIsBetween = require('./dateIsBetween');

    const siteResponse = await fetch(
      'https://raw.githubusercontent.com/nodejs/nodejs.org/master/locale/en/site.json'
    );
    const siteData = await siteResponse.json();
    const { banners } = siteData;

    const {
      index: { startDate, endDate, text, link },
    } = banners;

    if (!startDate || !endDate || !text || !link) {
      console.error(
        '\x1b[31m%s\x1b[0m',
        `Missing banner data: ${startDate}, ${endDate}, ${text}, ${link}`
      );
      return;
    }

    const configPath = path.join(__dirname, '..', 'src/config.json');
    const config = require(configPath);

    const dateBetween = dateIsBetween(startDate, endDate);
    const {
      banners: {
        index: { visible },
      },
    } = config;

    if ((!dateBetween && !visible) || (dateBetween && visible)) {
      console.log('\x1b[32m%s\x1b[0m', 'Nothing to change');
      return;
    }

    config.banners = banners;
    if (!dateBetween && visible) {
      config.banners.index.visible = false;
    } else if (dateBetween && !visible) {
      config.banners.index.visible = true;
    }

    const configStr = JSON.stringify(config, null, 2);
    fs.writeFileSync(configPath, configStr, 'utf8');
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', err);
  }
}

updateBanners();
