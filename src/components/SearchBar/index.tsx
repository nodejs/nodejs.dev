import React, { useState } from 'react';
import { useFlexSearch } from 'react-use-flexsearch';
import { Formik, Form, Field } from 'formik';
import { graphql, Link, useStaticQuery } from 'gatsby';

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
          (result: {
            id: React.Key | null | undefined;
            slug: string;
            title:
              | boolean
              | React.ReactChild
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <li key={result.id}>
              <Link to={`learn/${result.slug}`}>{result.title}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export default SearchBar;
