import React from 'react';
import { FormattedMessage } from 'react-intl';
import Author from '../../components/Author';
import './AuthorList.scss';

interface Props {
  authors: string[];
}

const AuthorList = ({ authors }: Props): null | JSX.Element => (
  <ul className="list">
    <FormattedMessage id="containers.authorList.title" tagName="li" />
    {authors.map(
      (author, i): string | JSX.Element =>
        author && <Author index={i} username={author} key={author} size="60" />
    )}
  </ul>
);

export default AuthorList;
