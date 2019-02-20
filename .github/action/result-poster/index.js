const { Toolkit } = require('actions-toolkit')
const { context, github } = new Toolkit({ event: 'check_run' })

const name = context.payload.check_run.name;
const conclusion = context.payload.check_run.conclusion;
const sha = context.sha;

if (name.startsWith('Build') && conclusion === 'success') {
  github.repos.createStatus(context.repo({
    sha,
    state: 'success',
    target_url: `https://storage.googleapis.com/staging.nodejs.dev/${sha.slice(0,7)}/index.html`,
    description: `Click details to preview changes`,
    context: 'Staging Link'
  }));
} else {
  // lol-magic.gif
  // exit without noise in the status
  process.exit(78);
}
