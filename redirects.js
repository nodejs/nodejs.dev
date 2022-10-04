// This file is used to define all the changed slugs from original nodejs.org site to our new site.
// Note.: Gatsby requires trailing slashes on the path names
module.exports = {
  // Redirects old About pages path to the new ones
  '/governance/': '/about/governance/',
  '/working-groups/':
    'https://github.com/nodejs/TSC/blob/main/WORKING_GROUPS.md',
  '/releases/': '/about/releases/',
  '/security/': '/about/security/',
  // Outside Redirects
  '/trademark/': 'https://trademark-policy.openjsf.org/',
  '/about/trademark/': 'https://trademark-policy.openjsf.org/',
  '/about/trademark/': 'https://trademark-policy.openjsf.org/',
  // Redirects the old `/docs` path to `/api`
  '/docs/*': '/api/',
  '/storybook/*': '/',
  '/learn/the-package-json-guide/':
    'https://docs.npmjs.com/cli/v8/configuring-npm/package-json',
  '/the-package-json-guide/':
    'https://docs.npmjs.com/cli/v8/configuring-npm/package-json',
  '/learn/the-package-lockjson-file/':
    'https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json',
  '/learn/how-to-exit-from-a-nodejs-program/': '/learn/',
  '/learn/where-does-npm-install-the-packages/': '//learn/',
  '/learn/get-http-request-body-data-using-nodejs/': '/learn/',
  '/learn/a-brief-history-of-nodejs/': '/learn/',
  '/learn/nodejs-file-paths/': '/learn/',
  '/learn/asynchronous-work/blocking-vs-non-blocking':
    'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing',
  '/learn/discover-javascript-timers':
    'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
  '/learn/modern-asynchronous-javascript-with-async-and-await':
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
  '/learn/the-nodejs-event-loop':
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
  '/blog/': '/blog',
  '/blog/advisory-board/2014/12/05/listening-to-the-community': '/blog',
  '/blog/community/2015/05/15/foundation-benefits-all/': '/blog',
  '/blog/community/2016/09/06/v5-to-v7': '/blog',
  '/blog/npm/2011/03/24/npm-1-0-global-vs-local-installation': '/blog',
  '/blog/vulnerabilities/2017/01/27/openssl-january-2017': '/blog',
  '/blog/vulnerabilities/2017/09/29/september-2017-path-validation': '/blog',
  '/blog/weekly-updates/2015/04/24/weekly-update.2015-04-24': '/blog',
  '/blog/weekly-updates/2015/05/29/weekly-update.2015-05-29': '/blog',
  '/blog/weekly-updates/2015/07/31/weekly-update.2015-07-31': '/blog',
  '/blog/weekly-updates/2016/02/15/weekly-update.2016-02-15': '/blog',
  '/blog/weekly-updates/2016/03/07/weekly-update.2016-03-07': '/blog',
  '/blog/weekly-updates/2016/08/15/weekly-update.2016-08-15': '/blog',
  '/blog/announcements/2021/10/07/retiring-the-node-js-community-committee':
    '/blog',
  '/blog/announcements/2022/02/14/nodejs-trademarks-transferred-to-openjs-foundation':
    '/blog',
  '/blog/announcements/2022/04/19/v18-release-announce': '/blog',
  '/blog/announcements/2022/06/08/nodejs16-eol': '/blog',
  '/blog/community/2016/12/03/update-v8-5.4': '/blog',
  '/blog/vulnerabilities/2018/06/12/june-2018-security-releases': '/blog',
  '/blog/weekly-updates/2015/07/17/weekly-update.2015-07-17': '/blog',
  '/blog/weekly-updates/2016/04/29/weekly-update.2016-04-29': '/blog',
  '/blog/weekly-updates/2016/07/22/weekly-update.2016-07-22': '/blog',
  '/blog/weekly-updates/2016/08/15/weekly-update.2016-08-15': '/blog',
  '/learn/accept-input-from-the-command-line-in-nodejs/': '/learn/',
  '/learn/asynchronous-flow-control/': '/learn/',
  '/learn/build-an-http-server/': '/learn/',
  '/learn/discover-javascript-timers/': '/learn/',
  '/learn/ecmascript-2015-es6-and-beyond/': '/learn/',
  '/learn/expose-functionality-from-a-nodejs-file-using-exports/':
    '/learn/',
  '/learn/find-the-installed-version-of-an-npm-package/': '/learn/',
  '/learn/how-to-log-an-object-in-nodejs/': '/learn/',
  '/learn/how-to-read-environment-variables-from-nodejs/': '/learn/',
  '/learn/how-to-use-the-nodejs-repl/': '/learn/',
  '/learn/install-an-older-version-of-an-npm-package/': '/learn/',
  '/learn/making-http-requests-with-nodejs/': '/learn/',
  '/learn/modern-asynchronous-javascript-with-async-and-await/':
    '/learn/',
  '/learn/nodejs-accept-arguments-from-the-command-line/': '/learn/',
  '/learn/nodejs-buffers/': '/learn/',
  '/learn/nodejs-streams/': '/learn/',
  '/learn/nodejs-with-typescript/': '/learn/',
  '/learn/nodejs-with-webassembly/': '/learn/',
  '/learn/output-to-the-command-line-using-nodejs/': '/learn/',
  '/learn/overview-of-blocking-vs-non-blocking/': '/learn/',
  '/learn/reading-files-with-nodejs/': '/learn/',
  '/learn/run-nodejs-scripts-from-the-command-line/': '/learn/',
  '/learn/semantic-versioning-using-npm/': '/learn/',
  '/learn/the-nodejs-event-loop/': '/learn/',
  '/learn/the-nodejs-events-module/': '/learn/',
  '/learn/the-npx-nodejs-package-runner/': '/learn/',
  '/learn/the-v8-javascript-engine/': '/learn/',
  '/learn/understanding-javascript-promises/': '/learn/',
  '/learn/understanding-setimmediate/': '/learn/',
  '/learn/uninstalling-npm-packages/': '/learn/',
  '/learn/update-all-the-nodejs-dependencies-to-their-latest-version/':
    '/learn/',
  '/learn/working-with-folders-in-nodejs': '/learn/',
  '/fr/learn/a-brief-history-of-nodejs/': '/fr/learn',
  '/fr/learn/build-an-http-server/': '/fr/learn',
  '/fr/learn/ecmascript-2015-es6-and-beyond/': '/fr/learn',
  '/fr/learn/error-handling-in-nodejs/': '/fr/learn',
  '/fr/learn/find-the-installed-version-of-an-npm-package/': '/fr/learn',
  '/fr/learn/javascript-asynchronous-programming-and-callbacks/': '/fr/learn',
  '/fr/learn/making-http-requests-with-nodejs/': '/fr/learn',
  '/fr/learn/nodejs-buffers/': '/fr/learn',
  '/fr/learn/nodejs-file-paths/': '/fr/learn',
  '/fr/learn/npm-dependencies-and-devdependencies/': '/fr/learn',
  '/fr/learn/run-nodejs-scripts-from-the-command-line/': '/fr/learn',
  '/fr/learn/the-nodejs-event-emitter/': '/fr/learn',
  '/fr/learn/the-nodejs-events-module/': '/fr/learn',
  '/fr/learn/the-nodejs-path-module/': '/fr/learn',
  '/fr/learn/update-all-the-nodejs-dependencies-to-their-latest-version/':
    '/fr/learn',
  '/fr/learn/working-with-folders-in-nodejs/': '/fr/learn',
  '/fr/learn/writing-files-with-nodejs/': '/fr/learn',
<<<<<<< HEAD
  '/learn/introduction-to-nodejs/': '/learn/',
  '/learn/the-nodejs-http-module/': '/learn/',
=======
  '/en/learn/introduction-to-nodejs/': '/en/learn/',
  '/learn/the-nodejs-http-module/': '/en/learn/',
>>>>>>> d0bf06174d4b2b6a9102a21da5ce3ad25db04ac8
};
