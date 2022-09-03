import { renderHook, act } from '@testing-library/react';

import useKeyPress from '../useKeyPress';

const createKeyDown = (key: string): KeyboardEvent => {
  return new KeyboardEvent('keydown', { key });
};

const createKeyUp = (key: string): KeyboardEvent => {
  return new KeyboardEvent('keyup', { key });
};

const mockExpandContainer = jest.fn();

describe('useKeyPress hook', () => {
  it('useKey Default (up)', () => {
    const key = '/';
    const { result } = renderHook(() => useKeyPress(key));

    expect(result.current).toBe(false);
  });

  it('useKey Down', () => {
    const key = '/';
    const { result } = renderHook(() =>
      useKeyPress(key, () => mockExpandContainer())
    );
    const keyDown = createKeyDown(key);

    act(() => {
      window.dispatchEvent(keyDown);
    });

    expect(result.current).toBe(true);
    expect(mockExpandContainer).toBeCalled();
  });

  it('useKey Up -> Down -> Up', () => {
    const key = '/';
    const { result } = renderHook(() => useKeyPress(key));
    const keyDown = createKeyDown(key);
    const keyUp = createKeyUp(key);

    act(() => {
      window.dispatchEvent(keyDown);
    });

    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(keyUp);
    });

    expect(result.current).toBe(false);
  });
});
