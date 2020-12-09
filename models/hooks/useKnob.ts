import { useState, useEffect, useRef } from 'react';
import { useMouseHover, useMouseActive } from '../hooks';
import { judgeGrabCursor } from '../judgeGrabCursor';

export const useKnob = (
  value: number,
  setValue: (value: number) => void,
  step: number
) => {
  const [Y, setY] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);
  const isHover = useMouseHover(knobRef);
  const isActive = useMouseActive(knobRef);

  useEffect(() => {
    valueRef.current = value;
  });

  useEffect(() => {
    const mouseMove = (e: MouseEvent): void => {
      setCurrentY(e.clientY);
    };
    if (isActive) {
      window.addEventListener('mousemove', mouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [isActive]);

  useEffect(() => {
    if (Y > currentY) {
      setValue(valueRef.current + step);
    };
    if (Y < currentY) {
      setValue(valueRef.current - step);
    };
    setY(currentY);
  }, [currentY]);

  useEffect(() => {
    const cursor = judgeGrabCursor(isHover, isActive);

    document.body.style.cursor = cursor;
  }, [isHover, isActive]);

  return knobRef;
};
