import React from 'react';
import { graphql } from 'gatsby';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from 'react-instantsearch-dom';
import SearchPreview from './search-preview';

const searchClient = algoliasearch(
  '1G9WNEG3D7',
  '53af8a91752f277de63d10195f17483b'
);

const Search = (): JSX.Element => (
  <React.Fragment>
    <InstantSearch searchClient={searchClient} indexName="Learn">
      <SearchBox />
      <Hits hitComponent={SearchPreview} />
    </InstantSearch>
  </React.Fragment>
);

export default Search;
