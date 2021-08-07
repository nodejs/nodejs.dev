const fetch = require('node-fetch');

async function getBannersData() {
  try {
    const siteResponse = await fetch(
      'https://raw.githubusercontent.com/nodejs/nodejs.org/master/locale/en/site.json'
    );
    const siteData = await siteResponse.json();
    const { banners: bannersData } = siteData;

    return bannersData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = getBannersData;
