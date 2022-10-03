import { render } from '@testing-library/react';
import React from 'react';

import DataTag from '..';

describe('Data Tag component', () => {
  it(`renders correctly when tag is 'E'`, () => {
    const { container } = render(<DataTag tag="E" />);
    expect(container).toMatchSnapshot();
  });

  it(`renders correctly when tag is 'C'`, () => {
    const { container } = render(<DataTag tag="C" />);
    expect(container).toMatchSnapshot();
  });

  it(`renders correctly when tag is 'M'`, () => {
    const { container } = render(<DataTag tag="M" />);
    expect(container).toMatchSnapshot();
  });
});
