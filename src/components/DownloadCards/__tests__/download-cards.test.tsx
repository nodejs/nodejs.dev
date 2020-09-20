import React from 'react';
import renderer from 'react-test-renderer';
import DownloadCards from '..';

describe('DownloadCards component', (): void => {
  it('renders correctly', (): void => {
    const tree = renderer.create(<DownloadCards userOS="WIN" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
