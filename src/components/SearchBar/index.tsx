import React, { useState } from 'react';
import { useFlexSearch } from 'react-use-flexsearch';
import { graphql, useStaticQuery } from 'gatsby';

import './SearchBar.scss';
import SearchInput from './SearchInput';

export interface SearchProps {
  localSearchLearnPages: {
    id: string;
    store: string;
    index: string[];
  };
}
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

  const { index } = queryData.localSearchLearnPages;
  const { store } = queryData.localSearchLearnPages;
  const [query, setQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  const results = useFlexSearch(query, index, store);

  const isEmpty = !results || results.length === 0;

  return (
    <SearchInput
      setQuery={setQuery}
      isEmpty={isEmpty}
      noResults={noResults}
      setNoResults={setNoResults}
      query={query}
      results={results}
    />
  );
};
export default SearchBar;
