import React from 'react';
import renderer from 'react-test-renderer';
import UpcomingReleases from '..';

describe('UpcomingReleases component', (): void => {
  it('renders correctly', (): void => {
    const tree = renderer.create(<UpcomingReleases />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
