import {useRef, useEffect} from 'react';

export const useKnob = (
    value: number,
    setValue: (value: number) => void,
    step: number
  ) => {
  const knobRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);

  let isActive: boolean = false;
  let isHover: boolean = false;
  let Y: number, currentY: number;

  useEffect(() => {
    valueRef.current = value;
  });

  useEffect(() => {
    const knob = knobRef.current;

    const mouseOver = (): void => {
      knob.addEventListener('mouseout', mouseOut);
      knob.removeEventListener('mouseover', mouseOver);
      window.addEventListener('mousedown', mouseDown);
      if (!isActive) {
        document.body.style.cursor = 'grab';
      };
      isHover = true;
    };

    const mouseOut = (): void => {
      knob.addEventListener('mouseover', mouseOver);
      knob.removeEventListener('mouseout', mouseOut);
      if (!isActive) {
        document.body.style.cursor = 'auto';
        window.removeEventListener('mousedown', mouseDown);
      };
      isHover = false;
    };

    const mouseDown = (e: MouseEvent): void => {
      document.body.style.cursor = 'grabbing';
      window.addEventListener('mouseup', mouseUp);
      window.addEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      Y = e.clientY;
      isActive = true;
    };

    const mouseUp = (): void => {
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mousemove', mouseMove);
      if (isHover) {
        document.body.style.cursor = 'grab';
        window.addEventListener('mousedown', mouseDown);
      };
      if (!isHover) {
        document.body.style.cursor = 'auto';
      };
      isActive = false;
    };

    const mouseMove = (e: MouseEvent): void => {
      currentY = e.clientY;
      setValue(valueRef.current + (Y - currentY) * step);
      Y = currentY;
    };

    knob.addEventListener('mouseover', mouseOver);

    return () => {
      knob.removeEventListener('mouseover', mouseOver);
    };
  }, []);

  return knobRef;
};
