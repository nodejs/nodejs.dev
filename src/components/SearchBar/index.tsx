import React from 'react';
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

  return (
    <SearchInput localSearchLearnPages={queryData.localSearchLearnPages} />
  );
};
export default SearchBar;
