const { Toolkit } = require('actions-toolkit')
const { context, github } = new Toolkit({ event: 'check_suite' })

const name = context.payload.check_suite.app.name
const conclusion = context.payload.check_suite.conclusion
const sha = context.payload.check_suite.head_sha
const prs = context.payload.check_suite.pull_requests

if (name === 'Google Cloud Build' && conclusion === 'success' && prs[0]) {
  github.issues.createComment(context.repo({
    number: prs[0].number,
    body: `Preview at: https://storage.googleapis.com/staging.nodejs.dev/${sha.slice(0, 7)}/index.html`
  }))
}
