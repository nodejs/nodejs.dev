const { nodeBannersData } = require('../apiUrls');

// @TODO: In the future the Banners Data should be stored directly in this Repository
// If this repository ever replaces the Nodejs.org repository
function getBannersData() {
  // This function gets the current Nodejs.org website metadata
  // And retrieves the `banners` data to display on the website
  return fetch(nodeBannersData)
    .then(response => response.json())
    .then(({ banners }) => banners);
}

module.exports = getBannersData;
