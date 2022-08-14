import React from 'react';
import { render } from '../../../../test-utils.js';
import { PureMacOSPanel as MacOSPanel } from '../MacOSPanel';

describe('Tests for MacOSPanel component', () => {
  it('renders correctly', () => {
    const { container } = render(<MacOSPanel nvmVersion="mockVersionString" />);
    expect(container).toMatchSnapshot();
  });
});
