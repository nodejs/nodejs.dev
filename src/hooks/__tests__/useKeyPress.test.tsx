// Test keypress event
import { renderHook, fireEvent } from '@testing-library/react';
import useKeyPress from '../useKeyPress';

describe('useKeyPress hook', () => {
  it('should return true when key is pressed', () => {
    const { result } = renderHook(() => useKeyPress('/'));
    fireEvent.keyUp(document, { key: '/' });

    expect(result.current).toBeTruthy();
  });

  it('should return false when key is not pressed', () => {
    const { result } = renderHook(() => useKeyPress('/'));
    fireEvent.keyDown(document, { key: '/' });
    expect(result.current).toBeFalsy();
  });
});
