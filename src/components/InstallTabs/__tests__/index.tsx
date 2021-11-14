import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import InstallTabs from '../index';
import * as detectOSModule from '../../../util/detectOS';
import { UserOS } from '../../../util/detectOS';

jest.mock('../../../util/detectOS');

describe('Tests for InstallTabs component', () => {
  it('renders correctly', () => {
    jest.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.UNKNOWN);
    const { container } = render(<InstallTabs />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for macOS', async () => {
    jest.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.MAC);
    const { container } = render(<InstallTabs />);
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for Linux', async () => {
    jest.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.LINUX);
    const { container } = render(<InstallTabs />);
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for Unix', async () => {
    jest.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.UNIX);
    const { container } = render(<InstallTabs />);
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for other', () => {
    jest.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.WIN);
    const { container } = render(<InstallTabs />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for mobile', () => {
    jest.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.MOBILE);
    const { container } = render(<InstallTabs />);
    expect(container).toMatchSnapshot();
  });
});
