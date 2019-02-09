workflow "Post Staging Link on pull_request" {
  on = "check_run"
  resolves = ["Post Staging Link"]
}

action "Post Staging Link" {
  uses = "mylesborins/action@master"
  secrets = ["GITHUB_TOKEN"]
}
