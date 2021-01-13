import * as React from 'react';
import { ToolItem } from './ToolItem';

type propsType = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

export const Play: React.FC<propsType> = ({ onClick }) => {
  return (
    <ToolItem onClick={onClick}>
      play
    </ToolItem>
  );
};
