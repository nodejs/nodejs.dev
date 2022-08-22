import React, { useEffect, useRef } from 'react';
import { throttle } from 'throttle-debounce';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { MdxLink } from 'gatsby-theme-i18n';
import { PaginationInfo, BlogPostAuthor, TableOfContents } from '../../types';
import AuthorsList from '../../containers/AuthorList';
import EditLink from '../EditLink';
import Pagination from '../Pagination';
import TOC from '../Toc';
import BlogAuthorsList from '../BlogAuthorsList';
import Codebox from '../Codebox';
import InlineCode from '../Codebox/InlineCode';

interface Props {
  title: string;
  body: string;
  tableOfContents?: TableOfContents;
  authors: string[] | BlogPostAuthor[];
  relativePath?: string;
  editPath?: string;
  next?: PaginationInfo;
  previous?: PaginationInfo;
  blog?: boolean;
  date?: string;
  children?: React.ReactNode;
}

const NAV_HEIGHT = 72;

const mdxComponents = { pre: Codebox, inlineCode: InlineCode, a: MdxLink };

const Article = ({
  title,
  body,
  tableOfContents,
  previous,
  next,
  relativePath,
  editPath,
  authors,
  blog,
  date,
  children,
}: Props): JSX.Element => {
  const element = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const currentElementRef = element;

    if (window.history.state && window.history.state.articleScrollTo) {
      window.scrollTo({ top: window.history.state.articleScrollTo });
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
      Array.from(currentElementRef.current.children).forEach((child): void => {
        observer.observe(child);
      });
    }

    return (): void => {
      if (currentElementRef && currentElementRef.current) {
        Array.from(currentElementRef.current.children).forEach(
          (child): void => {
            observer.unobserve(child);
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
      <div ref={element}>
        <MDXProvider components={mdxComponents}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </div>
      {children && (
        <div className="article-reader__additional-content">{children}</div>
      )}
      {!blog && <AuthorsList authors={authors as string[]} />}
      {!blog && <EditLink relativePath={relativePath} editPath={editPath} />}
      {!blog && <Pagination previous={previous} next={next} />}
    </article>
  );
};

export default Article;
