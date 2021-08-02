import React, { useState } from 'react';
import { useFlexSearch } from 'react-use-flexsearch';
import { Formik, Form, Field } from 'formik';
import { graphql, Link, useStaticQuery } from 'gatsby';
import config from '../../config.json';
import { SearchResult } from '../../types';
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
    console.log('queryData', queryData);
  const results = useFlexSearch(query, index, store);
  console.log('results', results);
  
  return (
    <div>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setQuery(values.query);
          setSubmitting(false);
        }}
      >
        <Form>
          <Field name="query" />
        </Form>
      </Formik>
      <ul>
        {results.map(
          (result: SearchResult) => (
            <li key={result.id}>
              <Link to={`${config.siteUrl}/learn/${result.slug}`}>{result.title}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export default SearchBar;
