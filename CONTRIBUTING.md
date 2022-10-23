# Contributing guide

Thank you for your interest in contributing to [nodejs.dev](https://nodejs.dev). Before you proceed, briefly go through the following:

  [Code of Conduct](https://github.com/nodejs/node/blob/HEAD/CODE_OF_CONDUCT.md)

* [🚀 Getting started](#-getting-started)
  * [Vocabulary](#vocabulary)
  * [📝 Commit message guidelines](#-commit-message-guidelines)
  * [📜 Pull Request Policy](#-pull-request-policy)
    * [Before merging](#before-merging)
    * [When merging](#when-merging)
  * [Becoming a collaborator](#becoming-a-collaborator)
  * [🐛 Debugging failing checks](#-debugging-failing-checks)
  * [Developer's Certificate of Origin 1.1](#developers-certificate-of-origin-11)
  * [Remarks](#remarks)

## 🚀 Getting started

1. Click the fork button in the top right to clone the [nodejs.dev repo][]

2. Clone your fork using SSH, GitHub CLI, or HTTPS. Assuming that your GitHub username is jane, do the following:

  ```bash
  git clone git@github.com:jane/nodejs.dev.git # SSH
  gh repo clone jane/nodejs.dev # GitHub CLI
  git clone https://github.com/jane/nodejs.dev.git # HTTPS
  ```

3. Change into the nodejs.dev directory.

  ```bash
  cd nodejs.dev
  ```

4. Create a remote for keeping your fork as well as your local clone up-to-date.

  ```bash
  git remote add upstream git@github.com:nodejs/nodejs.dev.git
  ```

5. Create a new branch for your work.

  ```bash
  git checkout -b name-of-your-branch
  ```

6. Run the following to install the dependencies and start a local preview of your work.

  ```bash
  npm install # installs this project's dependencies
  npm start # starts a preview of your local changes
  ```

7. Perform a merge to sync your current branch with the upstream branch.

 ```bash
git fetch upstream
git merge upstream/main
```

8. Run `npm test` to confirm that tests, linting, and formatting are passing. See [here](#-debugging-failing-checks) to fix failures. Ensure that your tests are passing before making a PR.

```bash
npm test
```

9. Once you're happy with your changes, add and commit them to your branch,
then push the branch to your fork.

    ```sh
    cd ~/nodejs.dev
    git add .
    git commit
    git push -u origin name-of-your-branch
    ```

10. Create a Pull Request. See [PR Policy](#-pull-request-policy)

> **Note**: Go through our [Commit](#-commit-message-guidelines) and Pull Request(#-pull-request-policy) guidelines outlined below.

## 📝 Commit message guidelines

This project follows the [Conventional Commits][] specification.

Basic rules:

* Commit messages must be prefixed with the name of the changed subsystem, followed by a colon and a space, and start with an imperative verb. Check the output of `git log --oneline files/you/changed` to find out what subsystems your changes touch. For example:
`
fix(index.js): fix non-responsive navbar
docs(CONTRIBUTING.md): correct typo errors
`

  Supported subsystems:

  > build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test

* Commit messages **must** start with a capital letter

* Commit messages **must not** end with a period `.`

## 📜 Pull Request Policy

### Before merging

* Pull Requests must be open for at least 48 hours unless changes include errata fixes, infrastructure maintenance, or tests.
* There must be no objections after 48 hours.
* Tests must be included in Pull Requests for new features or bug fixes. If any test(s) are failing, you are responsible for fixing them.

Each contribution is accepted only if there is no objection to it by a collaborator. During the review, collaborators may request that a specific contributor who is an expert in a particular area give an "LGTM" before the PR can be merged.

In the case that an objection is raised in a pull request by another collaborator, all collaborators involved should try to arrive at a consensus by addressing the concerns through discussion, compromise, or withdrawal of the proposed change(s).

### When merging

* Do not use the **merge** option
* [`squash`][] pull requests made up of multiple commits

## Vocabulary

* A **Contributor** is any individual who creates an issue/PR, comments on an issue/PR
  or contributes in some other way.
* A **Collaborator** is a contributor with write access to the repository. See [here](#becoming-a-collaborator) on how to become a collaborator.

## Becoming a collaborator

* Collaborators must be actively contributing to the project
* A Pull Request must be opened on the @nodejs/nodejs.dev README file adding the new collaborator to the list (note the order of names)
* The Pull Request must be approved by at least two members of @nodejs/nodejs.dev, @nodejs/website, or @nodejs/website-redesign
* The Pull Request must remain open for 72 hours without any objections

## 🐛 Debugging failing checks

* For failing formatting or linting, try running:

  ```bash
  npm run format
  ```

* Tests sometimes fail when you add or update HTML. Run the following to update snapshots:

```bash
npm run update-snapshot
```

## Developer's Certificate of Origin 1.1

By contributing to this project, I certify that:

* (a) The contribution was created in whole or in part by me and I have the right to
  submit it under the open source license indicated in the file; or
* (b) The contribution is based upon previous work that, to the best of my knowledge,
  is covered under an appropriate open source license and I have the right under that
  license to submit that work with modifications, whether created in whole or in part
  by me, under the same open source license (unless I am permitted to submit under a
  different license), as indicated in the file; or
* (c) The contribution was provided directly to me by some other person who certified
  (a), (b) or (c) and I have not modified it.
* (d) I understand and agree that this project and the contribution are public and that
  a record of the contribution (including all personal information I submit with it,
  including my sign-off) is maintained indefinitely and may be redistributed consistent
  with this project or the open source license(s) involved.

## Remarks

If something is missing here, or you feel something is not well described, feel free to create a PR.

[`squash`]: https://help.github.com/en/articles/about-pull-request-merges#squash-and-merge-your-pull-request-commits
[Conventional Commits]: https://www.conventionalcommits.org/
[nodejs.dev repo]: https://github.com/nodejs/nodejs.dev/fork
