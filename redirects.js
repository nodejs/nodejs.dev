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

  '/storybook/*': '/',

  // Blog
  // TODO: Migrate Blog Content to the new Website
  '/blog/advisory-board/2014/12/05/listening-to-the-community': '/blog/',
  '/blog/community/2015/05/15/foundation-benefits-all/': '/blog/',
  '/blog/community/2016/09/06/v5-to-v7': '/blog/',
  '/blog/npm/2011/03/24/npm-1-0-global-vs-local-installation': '/blog/',
  '/blog/vulnerabilities/2017/01/27/openssl-january-2017': '/blog/',
  '/blog/vulnerabilities/2017/09/29/september-2017-path-validation': '/blog/',
  '/blog/weekly-updates/2015/04/24/weekly-update.2015-04-24': '/blog/',
  '/blog/weekly-updates/2015/05/29/weekly-update.2015-05-29': '/blog/',
  '/blog/weekly-updates/2015/07/31/weekly-update.2015-07-31': '/blog/',
  '/blog/weekly-updates/2016/02/15/weekly-update.2016-02-15': '/blog/',
  '/blog/weekly-updates/2016/03/07/weekly-update.2016-03-07': '/blog/',
  '/blog/announcements/2021/10/07/retiring-the-node-js-community-committee':
    '/blog/',
  '/blog/announcements/2022/02/14/nodejs-trademarks-transferred-to-openjs-foundation':
    '/blog/',
  '/blog/announcements/2022/04/19/v18-release-announce': '/blog/',
  '/blog/announcements/2022/06/08/nodejs16-eol': '/blog/',
  '/blog/community/2016/12/03/update-v8-5.4': '/blog/',
  '/blog/vulnerabilities/2018/06/12/june-2018-security-releases': '/blog/',
  '/blog/weekly-updates/2015/07/17/weekly-update.2015-07-17': '/blog/',
  '/blog/weekly-updates/2016/04/29/weekly-update.2016-04-29': '/blog/',
  '/blog/weekly-updates/2016/07/22/weekly-update.2016-07-22': '/blog/',
  '/blog/weekly-updates/2016/08/15/weekly-update.2016-08-15': '/blog/',
};
