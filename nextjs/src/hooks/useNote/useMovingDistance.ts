import { useState, useEffect, useRef } from "react";

type coordinate = {
  x: number,
  y: number
};

export const useMovingDistance = (initialValue: coordinate) => {
  const [downPosition, setDownPosition] = useState<coordinate>(null);
  const [cursorPosition, setCursorPosition] = useState<coordinate>(null);
  const [movingDistance, setMovingDistance] = useState<coordinate>(initialValue);
  const renderRef = useRef(null);

  const down = (e: MouseEvent): void => {
    setDownPosition({x: e.clientX, y: e.clientY});
  };
  const cursor = (e: MouseEvent): void => {
    setCursorPosition({x: e.clientX, y: e.clientY});
  };

  useEffect(() => {
    if (renderRef.current) {
      const x: number = cursorPosition.x - downPosition.x;
      const y: number = cursorPosition.y - downPosition.y;
      setMovingDistance({x: x, y: y});
    };
  }, [cursorPosition]);

  useEffect(() => {
    renderRef.current = true;
  }, []);

  return [ movingDistance, { down, cursor } ] as const;
};
