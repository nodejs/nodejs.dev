import React from 'react';
import { render } from '../../../../test-utils.js';
import { PureLinuxPanel as LinuxPanel } from '../LinuxPanel';

describe('Tests for LinuxPanel component', () => {
  it('renders correctly', () => {
    const { container } = render(<LinuxPanel nvmVersion="mockVersionString" />);
    expect(container).toMatchSnapshot();
  });
});
