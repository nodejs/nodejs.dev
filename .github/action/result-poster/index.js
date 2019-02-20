const { Toolkit } = require('actions-toolkit')
const { context, github } = new Toolkit({ event: 'pull_request' })

const { action, pull_request: pr } = context.payload;
const ref = pr.head.sha;
// can't wait for top-level await

function getBuildCheckRun(suites) {
  return new Promise((resolve, reject) => {
    let result;
    suites.forEach((suite) => {
      console.log(suite.app.name);
    });
  });
}

async function main() {
  const result = await github.checks.listSuitesForRef(context.repo({
    ref
  }));
  getBuildCheckRun(result.data.check_suites);
};

main().catch((err) => {
  // magic!
  process.exit(78);
});
