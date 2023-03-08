/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import type {
  Contributor,
  ContributorApiResponse,
} from '../types/nodejsContributors';

const LIMIT_CONTRIBUTORS = 5;
const CONTRIBUTORS_API_URI = `https://api.github.com/repos/nodejs/node/contributors?per_page=${LIMIT_CONTRIBUTORS}`;

/**
 * Parses "Link" response header from node/contributors API
 * Returns page values for "next" and "last" API URLs
 * @param linkHeader
 */
export function linkParser(linkHeader: string): {
  [key: string]: {
    url: string;
    page: number;
  };
} {
  const regex = new RegExp(
    `<([^?]+\\?per_page=${LIMIT_CONTRIBUTORS}&[a-z]+=([\\d]+))>;[\\s]*rel="([a-z]+)"`,
    'g'
  );
  let array: RegExpExecArray | null = null;
  const object = {};

  do {
    array = regex.exec(linkHeader);

    if (array) {
      object[array[3]] = {
        url: array[1],
        page: parseInt(array[2], 10),
      };
    }
  } while (array !== null);

  return object;
}

/**
 * Retrieves max amount of contributors for Node.js main repo.
 * Returns array with random contributor index and max contributors found.
 */
export async function getMaxContributors(): Promise<[number, number]> {
  const response = await fetch(CONTRIBUTORS_API_URI);
  const linksHeaderValue = response.headers.get('Link');

  if (linksHeaderValue) {
    const links = linkParser(linksHeaderValue);

    const randomPage =
      Math.floor(Math.random() * Math.floor(links?.last?.page ?? 1)) + 1;
    return [randomPage, links?.last?.page ?? 1];
  }

  throw new Error('Failed to get amount if max contributors');
}

/**
 * Retrieves a contributor's object by it's index in API
 * @param randomPage
 */
export async function getContributor(randomPage: number): Promise<Contributor> {
  const response = await fetch(`${CONTRIBUTORS_API_URI}&page=${randomPage}`);
  const jsonResponse = (await response.json()) as ContributorApiResponse[];

  const contributorData: Contributor[] = jsonResponse.map(
    ({ avatar_url, login, contributions, html_url }) => ({
      avatarUri: avatar_url,
      login,
      contributionsCount: contributions,
      profileUri: html_url,
      commitsListUri: `https://github.com/nodejs/node/commits?author=${login}`,
    })
  );

  const contributor = contributorData.shift() as Contributor;

  if (window.localStorage) {
    window.localStorage.setItem(
      'contributors',
      JSON.stringify(contributorData)
    );
  }

  return contributor;
}

/**
 * Calls relative APIs and returns random contributor for Node.js main repo.
 * Trying to store cached data in localStorage in order to do less consequent requests
 */
export async function fetchRandomContributor(): Promise<Contributor> {
  let maxContributors: number | null = null;
  let fetchDate: number | null = null;
  let needToRefetch = false;
  let contributors: Contributor[] = [];
  const ONE_MONTH_MS = 2592000000;

  if (window.localStorage) {
    const maxContributorsStored =
      window.localStorage.getItem('max_contributors');
    const fetchDateStored = window.localStorage.getItem('fetch_date');

    contributors = JSON.parse(
      window.localStorage.getItem('contributors') || '[]'
    );

    maxContributors = maxContributorsStored
      ? parseInt(maxContributorsStored, 10)
      : null;
    fetchDate = fetchDateStored ? parseInt(fetchDateStored, 10) : null;
  }

  if (fetchDate && Date.now() - fetchDate >= ONE_MONTH_MS) needToRefetch = true;

  return new Promise((resolve, reject) => {
    if (contributors && contributors.length > 0 && !needToRefetch) {
      const contributor = contributors.shift();
      if (window.localStorage) {
        localStorage.setItem('contributors', JSON.stringify(contributors));
      }
      resolve(contributor as Contributor);
    } else if (maxContributors && !needToRefetch) {
      getContributor(
        Math.floor(Math.random() * Math.floor(maxContributors)) + 1
      )
        .then(contributor => resolve(contributor))
        .catch(error => reject(error));
    } else {
      getMaxContributors()
        .then(([randomPage]) => getContributor(randomPage))
        .then(contributor => {
          if (window.localStorage) {
            window.localStorage.setItem('fetch_date', String(Date.now()));
          }
          resolve(contributor);
        })
        .catch(error => reject(error));
    }
  });
}

export function useNodeJsContributorsApi(
  isVisible: boolean
): Contributor | null | undefined {
  const [contributor, setContributor] = useState<Contributor | null>(null);

  useEffect(() => {
    if (isVisible) {
      fetchRandomContributor()
        .then(contributorList => {
          setContributor(contributorList);
        })
        .catch(() => {
          setContributor(null);
        });
    }
  }, [isVisible]);
  return contributor;
}
