const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const safeJSON = require('./safeJSON');

const updateRedirects = redirects => {
  const firebaseConfig = resolve(__dirname, '../firebase.json');
  const firebaseJSON = safeJSON.parse(readFileSync(firebaseConfig));

  // Map data as firebase expects it to be
  const firebaseRedirects = {};

  Object.entries(redirects).forEach(([key, value]) => {
    firebaseRedirects[key] = {
      source: key,
      destination: value,
      type: '302',
    };
  });

  // Delete keys that already exists in the firebase.json
  Object.entries(firebaseJSON.redirects).forEach(([key]) => {
    delete firebaseRedirects[key];
  });

  // Serialize the redirects as firebase expects it to be
  const newRedirects = [];

  Object.keys(firebaseRedirects).forEach(value =>
    newRedirects.push({
      source: value,
      destination: firebaseRedirects[value].destination,
      type: '301',
    })
  );

  writeFileSync(
    firebaseConfig,
    safeJSON.toString({ ...firebaseJSON, redirects: newRedirects }, null, 2)
  );
};

module.exports = updateRedirects;
