import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../src/components/header';

describe('Tests for Header component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Header siteTitle="test-title" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
