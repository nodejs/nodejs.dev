// This file is used to define all the changed slugs from original nodejs.org site to our new site.
// Note.: Gatsby requires trailing slashes on the path names
module.exports = {
  // Redirects old About pages path to the new ones
  '/governance/': '/about/governance/',
  '/working-groups/': '/about/working-groups/',
  '/releases/': '/about/releases/',
  '/privacy/': '/about/privacy/',
  '/security/': '/about/security/',
  // Outside Redirects
  '/trademark/': 'https://trademark-policy.openjsf.org/',
  '/about/trademark/': 'https://trademark-policy.openjsf.org/',
  // Redirects the old `/docs` path to `/api`
  '/docs/*': '/api/',
  '/en/learn/the-packagejson-guide/': '/en/learn/',
  '/en/learn/how-to-exit-from-a-nodejs-program/': '/en/learn/',
  '/en/learn/where-does-npm-install-the-packages/': '/en/learn/',
  '/en/learn/get-http-request-body-data-using-nodejs/': '/en/learn/',
  '/en/learn/a-brief-history-of-nodejs/': '/en/learn/',
  '/en/learn/nodejs-file-paths/': '/en/learn/',
  '/learn/asynchronous-work/blocking-vs-non-blocking': 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing',
  '/learn/discover-javascript-timers': 'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
  '/learn/modern-asynchronous-javascript-with-async-and-await': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
  '/learn/the-nodejs-event-loop': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
};
