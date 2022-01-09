import React from 'react';
import { render } from '@testing-library/react';
import { PureMacOSPanel as MacOSPanel } from '../MacOSPanel';

describe('Tests for MacOSPanel component', () => {
  it('renders correctly', () => {
    const { container } = render(<MacOSPanel nvmVersion="mockVersionString" />);
    expect(container).toMatchSnapshot();
  });
});
