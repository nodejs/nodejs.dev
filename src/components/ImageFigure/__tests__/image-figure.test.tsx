/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import renderer from 'react-test-renderer';
import ImageFigure from '..';

describe('ImageFigure component', () => {
  it('renders correctly with footer', () => {
    const tree = renderer
      .create(
        <ImageFigure
          caption="mock-caption"
          src="mock-src"
          target="_self"
          alt="mock-alternate"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
