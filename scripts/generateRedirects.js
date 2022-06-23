const { resolve } = require('path');
const { readFileSync, writeFile } = require('fs');
const redirects = require('../util-node/redirects');

const firebaseConfig = resolve(__dirname, '../firebase.json');

const firebaseJSON = JSON.parse(readFileSync(firebaseConfig));

let firebaseRedirects = [];

firebaseRedirects = Object.entries(redirects).map(([key, value]) => ({
  source: key,
  destination: value,
  type: '301',
}));

writeFile(
  firebaseConfig,
  JSON.stringify(
    {
      ...firebaseJSON,
      redirects: firebaseRedirects,
    },
    null,
    2
  ),
  err => {
    if (err) console.error('error writing redirects', err);
    else {
      console.log('redirects written successfully\n');
    }
  }
);
