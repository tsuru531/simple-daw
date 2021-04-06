import { useEffect } from 'react';
import { useMouseHover, useMouseActive } from '.';

type cursor = 'ew-resize' | 'auto';

export const useEWResizeCursor = <T extends EventTarget>(refObject: React.RefObject<T>) => {
  const isHover = useMouseHover(refObject);
  const isActive = useMouseActive(refObject);

  const judgeCursor = (): cursor => {
    if (isActive) return 'ew-resize';
    if (isHover) return 'ew-resize';
    return 'auto';
  };

  useEffect(() => {
    const cursor = judgeCursor();
    document.body.style.cursor = cursor;
  }, [isHover, isActive]);
};
