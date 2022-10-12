import React from 'react';
import { render } from '@testing-library/react';
import Article from '..';
import {
  createLearnPageData,
  createLearnPageContext,
} from '../../../__fixtures__/page';

const getArticleProps = () => {
  const learnPageData = createLearnPageData();
  const learnPageContext = createLearnPageContext();

  const {
    data: { articleCurrentLanguage },
  } = learnPageData;

  const {
    frontmatter: { title },
    body,
    tableOfContents,
    fields: { authors },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = articleCurrentLanguage!;

  const { relativePath, next, previous } = learnPageContext;

  return {
    title,
    body,
    next,
    previous,
    authors,
    relativePath,
    tableOfContents,
  };
};

describe('Article component', () => {
  const intersectionObserverOriginal = window.IntersectionObserver;
  const scrollToOriginal = window.scrollTo;
  const replaceStateOriginal = window.history.replaceState;

  afterEach(() => {
    window.IntersectionObserver = intersectionObserverOriginal;
    window.scrollTo = scrollToOriginal;
    window.history.replaceState = replaceStateOriginal;

    // clean-up history state
    window.history.replaceState({}, '', null);
  });

  it('renders correctly', () => {
    const {
      title,
      tableOfContents,
      body,
      next,
      previous,
      authors,
      relativePath,
    } = getArticleProps();

    const { container } = render(
      <Article
        title={title}
        tableOfContents={tableOfContents?.items}
        body={body}
        next={next}
        previous={previous}
        authors={authors}
        relativePath={relativePath}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly in case body ref is null', () => {
    const {
      title,
      tableOfContents,
      body,
      next,
      previous,
      authors,
      relativePath,
    } = getArticleProps();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(React, 'useRef').mockReturnValueOnce(null);

    const { container } = render(
      <Article
        title={title}
        tableOfContents={tableOfContents?.items}
        body={body}
        next={next}
        previous={previous}
        authors={authors}
        relativePath={relativePath}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly in blog mode', () => {
    const { title, tableOfContents, body, next, previous, relativePath } =
      getArticleProps();

    const authors = [
      {
        id: '1',
        name: 'test-user',
        website: '',
      },
    ];

    const { container } = render(
      <Article
        title={title}
        tableOfContents={tableOfContents?.items}
        body={body}
        next={next}
        previous={previous}
        authors={authors}
        relativePath={relativePath}
        blog
        date="date string from test"
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should skip non-scrolled title from saving in history', () => {
    const {
      title,
      tableOfContents,
      body,
      next,
      previous,
      authors,
      relativePath,
    } = getArticleProps();

    window.history.replaceState = jest.fn();

    // mock IntersectionObserver
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.IntersectionObserver = jest.fn(callback => ({
      unobserve: jest.fn(),
      observe: jest.fn(() => {
        callback(
          [
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              boundingClientRect: {
                y: 100, // title still in view, not scrolled
              },
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              target: {
                previousElementSibling: null,
              },
            },
          ],
          jest.fn() as unknown as IntersectionObserver
        );
      }),
    }));

    render(
      <Article
        title={title}
        tableOfContents={tableOfContents?.items}
        body={body}
        next={next}
        previous={previous}
        authors={authors}
        relativePath={relativePath}
      />
    );

    expect(window.history.replaceState).toHaveBeenCalledTimes(0);
  });

  it('should accept and render child components', () => {
    const {
      title,
      tableOfContents,
      body,
      next,
      previous,
      authors,
      relativePath,
    } = getArticleProps();

    const { container } = render(
      <Article
        title={title}
        tableOfContents={tableOfContents?.items}
        body={body}
        next={next}
        previous={previous}
        authors={authors}
        relativePath={relativePath}
      >
        <div>test child JSX</div>
      </Article>
    );

    expect(container).toMatchSnapshot();
  });
});
