import * as React from 'react';
import { ToolItem } from './ToolItem';

type propsType = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

export const Stop: React.FC<propsType> = React.memo(({ onClick }) => {
  return (
    <ToolItem onClick={onClick}>
      stop
    </ToolItem>
  );
});
