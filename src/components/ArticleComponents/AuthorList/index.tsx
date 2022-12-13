import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Author from './Author';
import styles from './index.module.scss';
import githubFallbackImg from '../../../images/placeholder-img.png';

const GITHUB_IMG_SIZE = '60';

interface Props {
  authors: string[];
}

const authorImgCache = {};

function checkAuthorImg(username: string): Promise<string> {
  if (authorImgCache[username]) {
    return authorImgCache[username];
  }
  return new Promise(resolve => {
    let img: HTMLImageElement | null = new Image();
    const githubImgLink = `https://github.com/${username.trim()}.png?size=${GITHUB_IMG_SIZE}`;

    img.onload = () => {
      resolve(githubImgLink);
      authorImgCache[username] = githubImgLink;
      img = null;
    };

    img.onerror = () => {
      resolve(githubFallbackImg);
      authorImgCache[username] = githubFallbackImg;
      img = null;
    };

    img.src = githubImgLink;
  });
}

const AuthorList = ({ authors }: Props): JSX.Element => {
  const [githubImgLinks, setGithubImgLinks] = useState<string[]>([]);

  useEffect(() => {
    (async function authorImgLinks() {
      const links: string[] = await Promise.all(
        authors.map(author => checkAuthorImg(author.trim()))
      );
      setGithubImgLinks(links);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authors.length) {
    return (
      <div className={styles.authorList}>
        <FormattedMessage id="containers.authorList.title" />
        <ul>
          {authors.map((author, i): JSX.Element => {
            // Clean up author
            const username = author.trim();
            return (
              <Author
                index={i}
                username={username}
                key={username}
                githubImgLink={authorImgCache[username] ?? githubImgLinks[i]}
              />
            );
          })}
        </ul>
      </div>
    );
  }

  return <div />;
};

export default AuthorList;
