/**
 * A hook for detecting key presses.
 */
import { useEffect, useState } from 'react';

function useKeyPress(targetKey: string, cb?: () => void): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true);
        if (cb) {
          cb();
        }
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [cb, targetKey]);
  return keyPressed;
}

export default useKeyPress;
