import * as React from "react";
import { position } from "./types";

export const getClickPositionInElement = (
  e: MouseEvent,
  refObject: React.MutableRefObject<HTMLDivElement>
): position => {
  const clickX: number = e.pageX;
  const clickY: number = e.pageY;

  const clientRect: DOMRect = refObject.current.getBoundingClientRect();
  const elementPositionX: number = clientRect.left + window.pageXOffset;
  const elementPositionY: number = clientRect.top + window.pageYOffset;
  
  const clickPosition: position = {
    x: clickX - elementPositionX,
    y: clickY - elementPositionY,
  };

  return clickPosition;
};
