import { useState, useEffect } from 'react';

export const useMouseHover = <T extends EventTarget>(refObject: React.RefObject<T>): boolean => {
  const [isHover, setState] = useState<boolean>(false);

  useEffect(() => {
    const mouseOver = (): void => setState(true);
    if (!isHover) {
      refObject.current.addEventListener('mouseover', mouseOver);
    };
    return () => {
      refObject.current.removeEventListener('mouseover', mouseOver);
    };
  }, [isHover]);

  useEffect(() => {
    const mouseOut = (): void => setState(false);
    if (isHover) {
      refObject.current.addEventListener('mouseout', mouseOut);
    };
    return () => {
      refObject.current.removeEventListener('mouseout', mouseOut);
    };
  }, [isHover]);

  return isHover;
};
