import * as React from 'react';

type props = {
  d: string,
  refObject: React.RefObject<SVGPathElement>
};

export const Body: React.FC<props> = ({ d, refObject }) => {
  return (
    <path
      fill="yellow"
      stroke="black"
      d={d}
      ref={refObject}
    />
  );
};
