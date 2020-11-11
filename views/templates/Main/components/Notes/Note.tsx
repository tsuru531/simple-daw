import * as React from 'react';

type props = {
  keyNum: number,
  startTime: number,
  length: number
};

export const Note: React.FC<props> = ({keyNum, startTime, length}) => {
  return (
    <p>keyNum: {keyNum}, start: {startTime}, length: {length}</p>
  );
};
