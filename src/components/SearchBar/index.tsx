import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import './SearchBar.scss';
import SearchInput from './SearchInput';

const SearchBar = (): JSX.Element => {
  const queryData = useStaticQuery(graphql`
    query localSearchLearnPages {
      siteSearchIndex {
        index
      }
    }
  `);

  return <SearchInput localSearchLearnPages={queryData.siteSearchIndex} />;
};

export default SearchBar;
