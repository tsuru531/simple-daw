import { useState, useEffect } from 'react';

type element = HTMLElement | SVGPathElement;

export const useMouseHover = (refObject: React.MutableRefObject<element>): boolean => {
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