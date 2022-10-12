import React, { useMemo, useEffect, useState, createRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import SectionTitle from '../SectionTitle';
import useKeyPress from '../../../hooks/useKeyPress';
import { useSearchResults } from '../../../hooks/useSearchResults';
import { SearchResult } from '../../../types';
import styles from './index.module.scss';

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };
const containerVariants = {
  expanded: {
    minHeight: '5em',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0px 2px 12px 3px rgba(153, 204, 125, 0.14)',
  },
  collapsed: {
    minHeight: '0em',
    width: '100%',
    maxWidth: '100px',
    boxShadow: 'none',
  },
};

const MotionCloseIcon = motion(CloseIcon);

const SearchBar = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const searchInputRef = createRef<HTMLInputElement>();

  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();

  const search = useSearchResults();

  const results = useMemo(() => search(query), [query, search]);

  const isEmpty = !results || results.length === 0;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setQuery('');
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

  useKeyPress('/', () => onKeyPressHandler());
  useKeyPress('Escape', () => {
    if (isExpanded) {
      collapseContainer();
      searchInputRef.current?.blur();
    }
  });

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
        <TravelExploreIcon className={styles.searchIcon} />
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
            <MotionCloseIcon
              className={styles.closeIcon}
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            />
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
              {results.map((result: SearchResult) => {
                const sectionPath =
                  result.category === 'api'
                    ? ['home', result.category, result.title]
                    : ['home', result.category];

                const displayTitle = result.displayTitle || result.title;

                return (
                  <li key={result.id}>
                    <Link to={result.slug}>
                      {(result.wrapInCode && <code>{displayTitle}</code>) || (
                        <span>{displayTitle}</span>
                      )}
                    </Link>
                    <SectionTitle path={sectionPath} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SearchBar;
