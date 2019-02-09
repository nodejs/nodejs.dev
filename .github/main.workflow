workflow "Post Staging Link on pull_request" {
  on = "check_suite"
  resolves = ["Post Staging Link"]
}

action "Post Staging Link" {
  uses = "mylesborins/action@master"
  secrets = ["GITHUB_TOKEN"]
}
