const fetch = require('node-fetch');

async function getBannersData() {
  try {
    // @TODO: In the future the Banners Data should be stored directly in this Repository
    // If this repository ever replaces the Nodejs.org repository
    const siteResponse = await fetch(
      'https://raw.githubusercontent.com/nodejs/nodejs.org/main/locale/en/site.json'
    );

    const siteData = await siteResponse.json();

    const { banners: bannersData } = siteData;

    return bannersData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = getBannersData;
