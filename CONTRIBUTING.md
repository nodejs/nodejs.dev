# Making changes to the Website-Prototype

## Commit Guidelines

There is a built in commit linter. Basic rules:

* Commit messages must be prefixed with the name of the changed subsystem and start with an imperative verb. Check the output of `git log --oneline files/you/changed` to find out what subsystems your changes touch.

  Supported subsystems:

  > build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test

* Commit messages must start with a capital letter
* Commit message must end with a period `.`

## Collaboration Policy

- All changes must come in a PR
- All changes must be reviewed by a member of @nodejs/nodejs.dev,
  @nodejs/website, or @nodejs/website-redesign
- Pull Requests must be open for at least 24 hours unless included in the special exemptions section below

### Special Exemptions
Pull requests seeking to make any of the following changes do not need to wait 24 hours

* Errata fixes
* Infrastructure Maintenance
* Tests

## Landing Pull Requests

### Before you can land

- The Status Checks for the test suite must pass
- There must be at least one sign off

## When Landing

- Do not use merge button
- [`squash`][] pull-requests made up of multiple commits
- Land how you like as long as there are no merge commits

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
