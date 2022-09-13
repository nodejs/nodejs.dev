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
};
