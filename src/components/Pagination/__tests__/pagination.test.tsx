/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '..';
import { createPaginationInfo } from '../../../../test/__fixtures__/page';

describe('Pagination component', () => {
  it('renders links to the next and previous page', () => {
    const paginationInfo = createPaginationInfo();
    const tree = renderer
      .create(<Pagination next={paginationInfo} previous={paginationInfo} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when there is no next page', () => {
    const paginationInfo = createPaginationInfo();
    const tree = renderer
      .create(<Pagination previous={paginationInfo} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when there is no previous page', () => {
    const paginationInfo = createPaginationInfo();
    const tree = renderer.create(<Pagination next={paginationInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('only renders links to pages that has a title', () => {
    const paginationInfo = createPaginationInfo();
    const nextPaginationInfo = { slug: 'test-slug', title: null };
    const tree = renderer
      .create(
        <Pagination next={nextPaginationInfo} previous={paginationInfo} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
