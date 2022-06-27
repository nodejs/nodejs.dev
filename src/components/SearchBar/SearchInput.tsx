import React, { useMemo, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { Index } from 'elasticlunr';
import { Link } from 'gatsby';
import { SearchResult } from '../../types';
import { SearchProps } from './types';

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };
const containerVariants = {
  expanded: {
    minHeight: '5em',
    width: '100%',
    maxWidth: '30em',
    boxShadow: '0px 2px 12px 3px rgba(153, 204, 125, 0.14)',
  },
  collapsed: {
    minHeight: '3em',
    width: '100%',
    maxWidth: '7em',
    boxShadow: 'none',
  },
};

const SearchInput = ({ localSearchLearnPages }: SearchProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [noResults, setNoResults] = useState(false);

  const isEmpty = !results || results.length === 0;
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();

  const storeIndex = useMemo(
    () => Index.load<SearchResult>(localSearchLearnPages.index),
    [localSearchLearnPages.index]
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
      setNoResults(false);
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
    setNoResults(false);
    setResults([]);
  };

  useEffect(() => {
    if (isClickedOutside) {
      collapseContainer();
    }
  }, [isClickedOutside]);

  return (
    <motion.div
      className="searchBarContainer"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      initial="collapsed"
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <div className="searchInputContainer">
        <i className="material-icons searchIcon">search</i>
        <input
          autoComplete="off"
          className="inputText"
          name="query"
          value={query}
          onChange={changeHandler}
          placeholder="Search"
          onFocus={expandContainer}
        />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              className="material-icons closeIcon"
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
        <div className="searchContent">
          {isEmpty && !noResults && (
            <div className="loadingWrapper">
              <div className="warningMessage">Start typing to Search</div>
            </div>
          )}
          {!isEmpty && (
            <ul>
              {results.map((result: SearchResult) => (
                <li className="resultItem" key={result.id}>
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

export default SearchInput;
