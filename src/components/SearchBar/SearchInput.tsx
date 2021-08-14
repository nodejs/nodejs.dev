import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { Link } from 'gatsby';
import { SearchResult } from '../../types';

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };
const containerVariants = {
  expanded: {
    height: '30em',
  },
  collapsed: {
    height: '3.8em',
  },
};

const SearchInput = (props: any): JSX.Element => {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();

  const changeHandler = (e: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    e.preventDefault();
    if (e.target.value === '') {
      props.setNoResults(false);
    }
    props.setQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    props.setQuery('');
    props.setNoResults(false);
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
        <div className="searchIcon material-icons">search</div>
        <input
          autoComplete="off"
          className="inputText"
          name="query"
          value={props.query}
          onChange={changeHandler}
          placeholder="search"
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
          {/* loading state with an expanded area for the results */}
          {props.isEmpty && !props.noResults && (
            <div className="loadingWrapper">
              <div className="warningMessage">Start typing to Search</div>
            </div>
          )}
          {/* success state */}
          {!props.isEmpty && (
            <>
              {props.results.map((result: SearchResult) => (
                <ul key={result.id}>
                  <li className="resultItem">
                    <Link to={`/learn/${result.slug}`}>{result.title}</Link>
                  </li>
                </ul>
              ))}
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SearchInput;
