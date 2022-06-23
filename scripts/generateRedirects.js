const { resolve } = require('path');
const { readFileSync, writeFile } = require('fs');
const redirects = require('../util-node/redirects');

const firebaseConfig = resolve(__dirname, '../firebase.json');

const firebaseJSON = JSON.parse(readFileSync(firebaseConfig));

const firebaseRedirects = Object.entries(redirects).map(([key, value]) => ({
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
    // eslint-disable-next-line no-console
    if (err) console.error('error writing redirects', err);
    else {
      // eslint-disable-next-line no-console
      console.log('redirects written successfully\n');
    }
  }
);
