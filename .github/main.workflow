workflow "Post Staging Link on pull_request" {
  on = "pull_request"
  resolves = ["Post Staging Link"]
}

action "Post Staging Link" {
  uses = "./.github/action/result-poster"
  secrets = ["GITHUB_TOKEN"]
}
