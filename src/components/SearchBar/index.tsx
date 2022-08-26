import React, { useMemo, useEffect, useState, createRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { Index, SerialisedIndexData } from 'elasticlunr';
import { SearchResult } from '../../types';
import styles from './index.module.scss';

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };
const containerVariants = {
  expanded: {
    minHeight: '5em',
    width: '100%',
    maxWidth: '30em',
    boxShadow: '0px 2px 12px 3px rgba(153, 204, 125, 0.14)',
  },
  collapsed: {
    minHeight: '0em',
    width: '100%',
    maxWidth: '7em',
    boxShadow: 'none',
  },
};

const SearchBar = (): JSX.Element => {
  const { siteSearchIndex } = useStaticQuery(graphql`
    query localSearchLearnPages {
      siteSearchIndex {
        index
      }
    }
  `);

  const resultData = siteSearchIndex.index as SerialisedIndexData<SearchResult>;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchInputRef = createRef<HTMLInputElement>();

  const isEmpty = !results || results.length === 0;
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();

  const storeIndex = useMemo(
    () => Index.load<SearchResult>(resultData),
    [resultData]
  );

  const searchForResults = (currentQuery: string) => {
    const currentResults = storeIndex
      .search(currentQuery, { expand: true })
      .map(({ ref }) => storeIndex.documentStore.getDoc(ref) as SearchResult);

    setResults(currentResults.slice(0, 20));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value === '') {
      setResults([]);
    }

    setQuery(e.target.value);
    searchForResults(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setQuery('');
    setResults([]);
  };

  useEffect(() => {
    if (isClickedOutside) {
      collapseContainer();
    }
  }, [isClickedOutside]);

  const containerClassNames = classNames(styles.searchBarContainer, {
    [styles.expanded]: isExpanded,
  });

  const onKeyPressHandler = () => {
    if (!isExpanded) {
      expandContainer();
    }

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <motion.div
      className={containerClassNames}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      initial="collapsed"
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <div
        className={styles.searchInputContainer}
        onKeyPress={onKeyPressHandler}
        onClick={onKeyPressHandler}
        role="presentation"
      >
        <i className={`material-icons ${styles.searchIcon}`}>travel_explore</i>
        <label htmlFor="searchInput">
          <span>
            {!isExpanded && (
              <FormattedMessage id="components.searchBar.placeholder" />
            )}
          </span>
          <input
            ref={searchInputRef}
            autoComplete="off"
            className={styles.inputText}
            id="searchInput"
            name="query"
            type="text"
            value={query}
            onFocus={onKeyPressHandler}
            onChange={changeHandler}
          />
        </label>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              className={`material-icons ${styles.closeIcon}`}
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              close
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {isExpanded && (
        <div className={styles.searchContent}>
          {isEmpty && (
            <div className={styles.loadingWrapper}>
              <div className={styles.warningMessage}>
                <FormattedMessage
                  id={
                    query.length
                      ? 'components.searchBar.search.noResults'
                      : 'components.searchBar.search.title'
                  }
                />
              </div>
            </div>
          )}
          {!isEmpty && (
            <ul>
              {results.map((result: SearchResult) => (
                <li className={styles.resultItem} key={result.id}>
                  <Link to={`/learn/${result.slug}`}>{result.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SearchBar;
