import {useState, useEffect, useRef} from 'react';

export const useKnob = (
  value: number,
  setValue: (value: number) => void,
  step: number
) => {
  const [isHover, setHoverState] = useState(false);
  const [isActive, setActiveState] = useState(false);
  const [Y, setY] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  });

  useEffect(() => {
    const mouseOver = (): void => {
      setHoverState(true);
    };
    if (!isHover) {
      knobRef.current.addEventListener('mouseover', mouseOver);
    };
    return () => {
      knobRef.current.removeEventListener('mouseover', mouseOver);
    };
  }, [isHover]);

  useEffect(() => {
    const mouseOut = (): void => {
      setHoverState(false);
    };
    if (isHover) {
      knobRef.current.addEventListener('mouseout', mouseOut);
    };
    return () => {
      knobRef.current.removeEventListener('mouseout', mouseOut);
    };
  }, [isHover]);

  useEffect(() => {
    const mouseDown = (): void => {
      setActiveState(true);
    };
    if (isHover && !isActive) {
      knobRef.current.addEventListener('mousedown', mouseDown);
    };
    return () => {
      knobRef.current.removeEventListener('mousedown', mouseDown);
    };
  }, [isHover, isActive]);

  useEffect(() => {
    const mouseUp = (): void => {
      setActiveState(false);
    };
    if (isActive) {
      window.addEventListener('mouseup', mouseUp);
    };
    return () => {
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [isActive]);

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
    if (isHover && !isActive) {
      document.body.style.cursor = 'grab';
    };
    if (!isHover && !isActive) {
      document.body.style.cursor = 'auto';
    };
    if (isActive) {
      document.body.style.cursor = 'grabbing';
    };
  }, [isHover, isActive]);

  return knobRef;
};
