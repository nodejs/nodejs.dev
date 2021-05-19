import React from 'react';
import { throttle } from 'throttle-debounce';
import { PaginationInfo, BlogPostAuthor } from '../../types';
import AuthorsList from '../../containers/AuthorList';
import EditLink from '../EditLink';
import Pagination from '../Pagination';
import TOC from '../Toc';
import BlogAuthorsList from '../BlogAuthorsList';

interface Props {
  title: string;
  html: string;
  tableOfContents?: string;
  authors: string[] | BlogPostAuthor[];
  relativePath?: string;
  editPath?: string;
  next?: PaginationInfo;
  previous?: PaginationInfo;
  blog?: boolean;
  date?: string;
}

const NAV_HEIGHT = 72;

const Article = ({
  title,
  html,
  tableOfContents,
  previous,
  next,
  relativePath,
  editPath,
  authors,
  blog,
  date,
}: Props): JSX.Element => {
  const element = React.useRef<HTMLDivElement>(null);

  React.useEffect((): (() => void) => {
    const currentElementRef = element;

    if (window.history.state && window.history.state.articleScrollTo) {
      window.scrollTo({
        top: window.history.state.articleScrollTo,
      });
    }

    const handleObserverThrottled = throttle(
      300,
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry): void => {
          // element is already hidden by the nav
          if (entry.boundingClientRect.y < NAV_HEIGHT) {
            if (!entry.target.previousElementSibling) {
              window.history.replaceState(
                {
                  articleScrollTo: null,
                },
                '',
                null
              );
              return;
            }

            window.history.replaceState(
              {
                articleScrollTo: document.documentElement.scrollTop,
              },
              '',
              null
            );
          }
        });
      }
    );

    const observer = new IntersectionObserver(
      (entries): void => {
        handleObserverThrottled(entries);
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: `-${NAV_HEIGHT}px 0px 0px 0px`,
      }
    );

    if (currentElementRef && currentElementRef.current) {
      Array.from(currentElementRef.current.children).forEach(
        (children): void => {
          observer.observe(children);
        }
      );
    }

    return (): void => {
      if (currentElementRef && currentElementRef.current) {
        Array.from(currentElementRef.current.children).forEach(
          (children): void => {
            observer.unobserve(children);
          }
        );
      }
    };
  }, []);

  return (
    <article className="article-reader">
      <h1 className="article-reader__headline">{title}</h1>
      {blog && (
        <BlogAuthorsList date={date} authors={authors as BlogPostAuthor[]} />
      )}
      {!blog && (
        <TOC heading="TABLE OF CONTENTS" tableOfContents={tableOfContents} />
      )}
      {/* eslint-disable-next-line react/no-danger */}
      <div ref={element} dangerouslySetInnerHTML={{ __html: html }} />
      {!blog && <AuthorsList authors={authors as string[]} />}
      {!blog && <EditLink relativePath={relativePath} editPath={editPath} />}
      {!blog && <Pagination previous={previous} next={next} />}
    </article>
  );
};

export default Article;
