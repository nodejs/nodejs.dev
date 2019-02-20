const { Toolkit } = require('actions-toolkit')
const { context, github } = new Toolkit({ event: 'pull_request' })

const { action, pull_request: pr } = context.payload;
const ref = pr.head.sha;
// can't wait for top-level await
(async function main() {
  const result = await github.checks.listSuitesForRef(context.repo({
    ref
  }));
  console.log(result.data);
  process.exit(78);
}());
