import * as React from 'react';

type props = {
  d: string,
};

export const Paint: React.FC<props> = ({ d }) => {
  return (
    <path fill="yellow" stroke="black" d={d}/>
  );
};
