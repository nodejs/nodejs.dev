const { Toolkit } = require('actions-toolkit')
const { context, github: { request } } = new Toolkit()

const name = context.payload.check_suite.app.name;
const conclusion = context.payload.check_suite.conclusion
const sha = context.payload.check_suite.head_sha;
const prs = context.payload.check_suite.pull_requests;

if (name === 'Google Cloud Build' && conclusion === 'success' && prs[0]) {
  request('POST /repos/:owner/:repo/issues/:number/comments', context.repo({
    number: prs[0].number,
    body: `Preview at: https://staging.nodejs.dev/${sha.slice(0,7)}/index.html`
  }));
}
