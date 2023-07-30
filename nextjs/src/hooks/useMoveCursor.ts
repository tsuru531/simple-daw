import { useEffect } from 'react';
import { useMouseHover, useMouseActive } from '.';

type cursor = 'pointer' | 'move' | 'auto';

export const useMoveCursor = <T extends EventTarget>(refObject: React.RefObject<T>) => {
  const isHover = useMouseHover(refObject);
  const isActive = useMouseActive(refObject);

  const judgeCursor = (): cursor => {
    if (isActive) return 'move';
    if (isHover) return 'pointer';
    return 'auto';
  };

  useEffect(() => {
    const cursor = judgeCursor();
    document.body.style.cursor = cursor;
  }, [isHover, isActive]);
};
