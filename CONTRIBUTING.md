# Contributing Guide

## 🚀 Get Started

* Fork the [nodejs.dev repo][] using the Fork button on the top right

* Clone your fork using SSH, GitHub CLI, or HTTPS

  ```bash
  git clone git@github.com:<GITHUB_ID>/nodejs.dev.git # SSH
  gh repo clone <GITHUB_ID>/nodejs.dev # GitHub CLI
  git clone https://github.com/<GITHUB_ID>/nodejs.dev.git # HTTPS
  ```

* Change into the nodejs.dev project directory

  ```bash
  cd nodejs.dev
  ```

* Add nodejs/nodejs.dev as your upstream remote branch

  ```bash
  git remote add upstream git@github.com:nodejs/nodejs.dev.git
  ```

* Create a new branch for your awesome work

  ```bash
  git checkout -b <BRANCH_NAME>
  ```

* Confirm tests, linting, and formatting are passing. See [here](#-debugging-failing-checks) to fix failures

  ```bash
  npm test # Runs formatter and linter also
  ```

* Commit your work. See [Commit Guidelines](#-commit-message-guidelines)

* Push to your branch

  ```bash
  git push -u origin <YOUR_BRANCH>
  ```

* Open a pull request. See [PR Policy](#-pull-request-policy)

## Vocabulary

* A **Contributor** is any individual creating or commenting on an issue or pull request,
  or contributing in some other way.
* A **Collaborator** is a contributor who has been given write access to the repository. See [here](#how-to-become-a-collaborator) on how to become a collaborator.

## 📝 Commit Message Guidelines

This project follows the [Conventional Commits][] specification.

Basic rules:

* Commit messages must be prefixed with the name of the changed subsystem, followed by a colon and a space and start with an imperative verb. Check the output of `git log --oneline files/you/changed` to find out what subsystems your changes touch.

  Supported subsystems:

  > build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test

* Commit messages **must** start with a capital letter

* Commit messages **must not** end with a period `.`

## 📜 Pull Request Policy

### Before landing

* Pull Requests must be open for at least 48 hours unless changes include errata fixes, infrastructure maintenance, or tests
* There must be no objections after a 48 hour period
* Pull Requests for a new feature or bug fix must include tests

The default for each contribution is that it is accepted once no collaborator has an objection. During review collaborators may also request that a specific contributor who is most versed in a particular area gives a "LGTM" before the PR can be merged.

In the case of an objection being raised in a pull request by another collaborator, all involved collaborators should seek to arrive at a consensus by way of addressing concerns being expressed by discussion, compromise on the proposed change, or withdrawal of the proposed change.

## When Landing

* Do not use merge button
* [`squash`][] pull-requests made up of multiple commits
* Land how you like as long as there are no merge commits

## How to become a collaborator

* Collaborators must be actively contributing to the project
* A Pull Request must be opened on the @nodejs/nodejs.dev README file adding the new collaborator to the list (note the order of names)
* The Pull Request must be approved by at least two members of @nodejs/nodejs.dev, @nodejs/website, or @nodejs/website-redesign
* Pull Request must remain open for 72 hours without any objections
* Once the requirements are met and approved, the pull request can be merged and a member of @nodejs/community-committee will add the new member to the [@nodejs/nodejs-dev team](https://github.com/orgs/nodejs/teams/nodejs-dev)


## 🐛 Debugging Failing Checks

For failing formatting or linting, you can try running:

```bash
npm run format
```

Tests sometimes fail when adding or updating HTML. To update snapshots you can run:

```bash
npm run update-snapshot
```

## Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

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

[`squash`]: https://help.github.com/en/articles/about-pull-request-merges#squash-and-merge-your-pull-request-commits
[conventional commits]: https://www.conventionalcommits.org/
[nodejs.dev repo]: https://github.com/nodejs/nodejs.dev
