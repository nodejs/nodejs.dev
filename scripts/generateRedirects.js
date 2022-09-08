const { resolve } = require('path');
const { readFileSync, writeFile } = require('fs');
const redirects = require('../redirects');

const firebaseConfig = resolve(__dirname, '../firebase.json');

const firebaseJSON = JSON.parse(readFileSync(firebaseConfig));

/**
 * Map data as firebase expects it to be
 */
const firebaseRedirects = {};
Object.entries(redirects).forEach(([key, value]) => {
  firebaseRedirects[key] = {
    source: key,
    destination: value,
    type: '301',
  };
});

/**
 * Delete keys that already exists in the firebase.json
 */
Object.entries(firebaseJSON.redirects).forEach(([key]) => {
  delete firebaseRedirects[key];
});

/**
 * Serialize the redirects as firebase expects it to be
 */
const newRedirects = [];
Object.keys(firebaseRedirects).forEach(value =>
  newRedirects.push({
    source: value,
    destination: firebaseRedirects[value].destination,
    type: '301',
  })
);

writeFile(
  firebaseConfig,
  JSON.stringify(
    {
      ...firebaseJSON,
      redirects: newRedirects,
    },
    null,
    2
  ),
  err => {
    // eslint-disable-next-line no-console
    if (err) console.error('error writing redirects', err);
  }
);
