export interface ContributorApiResponse {
  login: string;
  id: number;
  url: string;
  type: string;
  contributions: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  site_admin: boolean;
}

export interface Contributor {
  avatarUri: string;
  profileUri: string;
  login: string;
  contributionsCount: number;
  commitsListUri: string;
}
