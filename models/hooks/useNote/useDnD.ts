import { useEffect } from 'react'

export const useDnD = (
  refObject: React.RefObject<EventTarget>,
  mouseDown: (e: MouseEvent) => void,
  mouseMove: (e: MouseEvent) => void,
  mouseUp: (e: MouseEvent) => void
): void => {
  useEffect(() => {
    const target = refObject.current;
  
    const onMouseDown = (e: MouseEvent): void => {
      window.addEventListener('mousemove', windowMouseMove);
      window.addEventListener('mouseup', windowMouseUp);
      target.removeEventListener('mousedown', onMouseDown);
      mouseDown(e);
    };
  
    const windowMouseMove = (e: MouseEvent): void => {
      mouseMove(e);
    };
  
    const windowMouseUp = (e: MouseEvent): void => {
      target.addEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', windowMouseMove);
      window.removeEventListener('mouseup', windowMouseUp);
      mouseUp(e);
    };
  
    target.addEventListener('mousedown', onMouseDown);
  
    return () => {
      target.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', windowMouseMove);
      window.removeEventListener('mouseup', windowMouseUp);
    };
  }, []);
};
