import * as React from 'react';

type props = {
  d: string,
  refObject: React.RefObject<SVGPathElement>
};

export const Left: React.FC<props> = ({ d, refObject }) => {
  return (
    <path
      fillOpacity="0"
      d={d}
      ref={refObject}
    />
  );
};
