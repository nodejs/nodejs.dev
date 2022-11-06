/**
 * A hook for detecting key presses.
 */
import { useEffect, useState } from 'react';

function useKeyPress(targetKey: string, cb?: (arg: KeyboardEvent) => void): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      const {key} = event;
      if (key === targetKey) {
        setKeyPressed(true);
        if (cb) {
          cb(event);
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
