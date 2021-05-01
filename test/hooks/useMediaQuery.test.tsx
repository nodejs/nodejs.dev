import React from 'react';
import { render } from '@testing-library/react';
import { useMediaQuery } from '../../src/hooks/useMediaQuery';

describe('useMediaQuery', () => {
  const MediaQueryRenderer = (): JSX.Element => {
    const mediaQueryResult = useMediaQuery('media-query-mock');

    if (typeof mediaQueryResult === 'undefined') {
      return <>undefined</>;
    }

    return mediaQueryResult ? <>true</> : <>false</>;
  };

  it('should check for matchMedia support', () => {
    const { container } = render(<MediaQueryRenderer />);
    expect(container).toMatchSnapshot();
  });

  it('should return true for matched query', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { container } = render(<MediaQueryRenderer />);
    expect(container).toMatchSnapshot();
  });

  it('should return false for not-matched query', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { container } = render(<MediaQueryRenderer />);
    expect(container).toMatchSnapshot();
  });

  it('should subscribe for media changes', () => {
    const listenerMock = jest.fn().mockImplementation((event, handler) => {
      handler();
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: listenerMock,
        removeEventListener: jest.fn(),
      })),
    });

    render(<MediaQueryRenderer />);
    expect(listenerMock).toHaveBeenCalledTimes(1);
  });
});
