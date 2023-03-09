const { nodeBannersData } = require('../apiUrls');

function getBannersData() {
  // This function gets the current Nodejs.org website metadata
  // And retrieves the `banners` data to display on the website
  return fetch(nodeBannersData)
    .then(response => response.json())
    .then(({ websiteBanners }) => websiteBanners);
}

module.exports = getBannersData;
