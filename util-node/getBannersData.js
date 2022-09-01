const fetch = require('node-fetch');

const { nodeBannersData } = require('../apiUrls');

// @TODO: In the future the Banners Data should be stored directly in this Repository
// If this repository ever replaces the Nodejs.org repository
function getBannersData() {
  return fetch(nodeBannersData)
    .then(response => response.json())
    .then(({ banners }) => banners);
}

module.exports = getBannersData;
