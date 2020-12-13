import { useState, useEffect } from 'react';
import { useMouseHover } from '../hooks';

type position = {
  x: number,
  y: number
};

export const useClickPosition = <T extends EventTarget>(refObject: React.RefObject<T>) => {
  const [clickPosition, setClickPosition] = useState<position>(null);
  const isHover = useMouseHover(refObject);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      setClickPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    if (isHover) window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
    };

  }, [isHover]);

  return clickPosition;
};
