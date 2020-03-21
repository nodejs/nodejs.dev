import React from 'react';
import { PaginationInfo } from '../types';
import AuthorsList from './authors-list';
import EditLink from './edit-link';
import Pagination from './pagination';
import TOC from './toc';

interface Props {
  title: string;
  html: string;
  tableOfContents: string;
  authors: string[];
  relativePath: string;
  next?: PaginationInfo;
  previous?: PaginationInfo;
}

interface Header {
  id: string;
  scrollYPos: number;
}

const Article = ({
  title,
  html,
  tableOfContents,
  previous,
  next,
  relativePath,
  authors,
}: Props): JSX.Element => {
  const element = React.useRef<HTMLElement | null>(null);
  const [headers, setHeaders] = React.useState<Header[]>([]);

  const handleRef = (ref?: HTMLElement | null): void => {
    if (ref) {
      element.current = ref;
    }
  };

  React.useEffect((): void => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.substr(1));

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }

    if (element.current) {
      // save current headers positions
      const newHeaders = Array.from(
        element.current.getElementsByTagName('h2')
      ).map(
        (header: HTMLHeadingElement): Header => ({
          id: `#${header.getAttribute('id')}`,
          scrollYPos: header.getBoundingClientRect().top - 64,
        })
      );

      setHeaders(newHeaders);
    }
  }, []);

  React.useEffect((): (() => void) => {
    let debounce: ReturnType<typeof setTimeout>;

    const handleScroll = (): void => {
      if (debounce) {
        clearTimeout(debounce);
      }

      debounce = setTimeout((): void => {
        // find right header based on current position
        const el = headers.find((header, index): boolean => {
          if (headers[index + 1]) {
            return (
              window.scrollY >= header.scrollYPos &&
              window.scrollY < headers[index + 1].scrollYPos
            );
          }

          return window.scrollY >= header.scrollYPos;
        });

        // set header id in url as hash
        if (el) {
          window.history.replaceState(null, '', el.id);
        }
      }, 10);
    };

    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headers]);

  return (
    <article className="article-reader">
      <h1 className="article-reader__headline">{title}</h1>
      <TOC heading="TABLE OF CONTENTS" tableOfContents={tableOfContents} />
      {/* eslint-disable-next-line react/no-danger */}
      <div ref={handleRef} dangerouslySetInnerHTML={{ __html: html }} />
      <AuthorsList authors={authors} />
      <EditLink relativePath={relativePath} />
      <Pagination previous={previous} next={next} />
    </article>
  );
};

export default Article;
