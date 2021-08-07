import React, { useEffect, useRef, useState } from 'react';
import { useFlexSearch } from 'react-use-flexsearch';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { graphql, Link, useStaticQuery } from 'gatsby';
import MoonLoader from 'react-spinners/MoonLoader';
// import config from '../../config.json';
import { SearchResult } from '../../types';
import './SearchBar.scss';

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };
const containerVariants = {
  expanded: {
    height: '30em',
  },
  collapsed: {
    height: '3.8em',
  },
};
const SearchBar = (): JSX.Element => {
  const queryData = useStaticQuery(graphql`
    query {
      localSearchLearnPages {
        id
        store
        index
      }
    }
  `);

  const index = queryData.localSearchLearnPages.index;
  const store = queryData.localSearchLearnPages.store;
  const [query, setQuery] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const [r, setR] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const results = useFlexSearch(query, index, store);

  const isEmpty = !results || results.length === 0;

  const changeHandler = e => {
    e.preventDefault();
    if (e.target.value.trim() === '') {
      setNoResults(false);
    }
    setQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setQuery('');
    setLoading(false);
    setNoResults(false);
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
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <div className="searchInputContainer">
        <div className="searchIcon"></div>
        <input
          autoComplete="false"
          autoCorrect="false"
          className="inputClass"
          name="query"
          value={query}
          onChange={changeHandler}
          placeholder="search"
          onFocus={expandContainer}
        />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              className="material-icons"
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
          {/* loading state with spinner displaying */}
          {isLoading && (
            <div className="loadingWrapper">
              <MoonLoader loading color="#000" size={20} />
            </div>
          )}

          {/* loading state with an expanded area for the results */}
          {!isLoading && isEmpty && !noResults && (
            <div className="loadingWrapper">
              <div className="warningMessage">Start typing to Search</div>
            </div>
          )}

          {/* loading state when no results are found */}
          {!isLoading && noResults && (
            <div className="loadingWrapper">
              <div className="warningMessage">No results found</div>
            </div>
          )}

          {/* success state */}
          {!isLoading && !isEmpty && (
            <>
              {results.map((result: SearchResult) => (
                <ul key={result.id}>
                  <li>{result.title}</li>
                </ul>
              ))}
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};
export default SearchBar;
