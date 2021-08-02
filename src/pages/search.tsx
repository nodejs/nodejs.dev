// this is a demo page that wont be kept around and was being used for debugging purposes.
import React, { useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { useFlexSearch } from 'react-use-flexsearch';
import { SearchResult } from '../types';


const SearchPage = (): JSX.Element => {
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
  const [query, setQuery] = useState<string>('');
  const results = useFlexSearch(query, index, store);
  return (
    <main>
      <h1>Search</h1>
      <label>
        <span>Search query</span>
        <input
          name="query"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </label>
      <h2>Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((result: SearchResult) => (
            <li key={result.id}>
              {/* TODC: this is not the right way to do this but it works... */}
              <Link to={`http://nodejs.dev/learn/${result.slug}`}>
                {result.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results!</p>
      )}
    </main>
  );
};

export default SearchPage;
