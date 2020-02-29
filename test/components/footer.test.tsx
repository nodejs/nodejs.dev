import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../../src/components/footer';

describe('Tests for Footer component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
