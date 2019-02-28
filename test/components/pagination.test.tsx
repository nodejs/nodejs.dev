import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../../src/components/pagination';

describe('Pagination component', () => {
  it('renders links to the next and previous page', () => {
    const next = { frontmatter: { title: 'next-page' }, fields: { slug: 'next-page' }};
    const prev = { frontmatter: { title: 'prev-page' }, fields: { slug: 'prev-page' }};
    const tree = renderer.create(<Pagination next={next} previous={prev} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when there is no next page', () => {
    const prev = { frontmatter: { title: 'prev-page' }, fields: { slug: 'prev-page' }};
    const tree = renderer.create(<Pagination previous={prev} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when there is no previous page', () => {
    const next = { frontmatter: { title: 'next-page' }, fields: { slug: 'next-page' }};
    const tree = renderer.create(<Pagination next={next} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('only renders links to pages that has a title', () => {
    const next = { frontmatter: { title: 'next-page' }, fields: { slug: 'next-page' }};
    const prev = { frontmatter: { title: null }, fields: { slug: 'prev-page' }};
    const tree = renderer.create(<Pagination next={next} previous={prev} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
