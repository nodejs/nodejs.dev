import { ContributorApiResponse, Contributor } from '../../src/hooks';

export const createRandomContributorApiData = (): ContributorApiResponse => ({
  login: 'login_mock',
  id: 0,
  node_id: 'node_id_mock',
  avatar_url: 'avatar_url_mock',
  gravatar_id: 'gravatar_id_mock',
  url: 'url_mock',
  html_url: 'html_url_mock',
  followers_url: 'followers_url_mock',
  following_url: 'following_url_mock',
  gists_url: 'gists_url_mock',
  starred_url: 'starred_url_mock',
  subscriptions_url: 'subscriptions_url_mock',
  organizations_url: 'organizations_url_mock',
  repos_url: 'repos_url_mock',
  events_url: 'events_url_mock',
  received_events_url: 'received_events_url_mock',
  type: 'type_mock',
  site_admin: false,
  contributions: 0,
});

export const createRandomContributorViewData = (): Contributor => ({
  avatarUri: 'avatarUri_mock',
  profileUri: 'profileUri_mock',
  login: 'login_mock',
  contributionsCount: 0,
  commitsListUri: 'commitsListUri_mock',
});
