import { useState, useEffect } from 'react';

export const useMouseActive = <T extends EventTarget>(refObject: React.MutableRefObject<T>): boolean => {
  const [isActive, setState] = useState<boolean>(false);

  useEffect(() => {
    const mouseDown = (): void => setState(true);
    if (!isActive) {
      refObject.current.addEventListener('mousedown', mouseDown);
    };
    return () => {
      refObject.current.removeEventListener('mousedown', mouseDown);
    };
  }, [isActive]);

  useEffect(() => {
    const mouseUp = (): void => setState(false);
    if (isActive) {
      window.addEventListener('mouseup', mouseUp);
    };
    return () => {
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [isActive]);

  return isActive;
};
