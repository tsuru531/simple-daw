type axis = "x" | "y";
type curry = (startPosition: number) => number;

export const cursorPosition = (e: MouseEvent, axis: axis): curry => {
  let position: number;

  if (axis === "x") position = e.clientX;
  if (axis === "y") position = e.clientY;

  return (startPosition?: number): number => {
    if (startPosition) position = position - startPosition;

    return position;
  };
};
