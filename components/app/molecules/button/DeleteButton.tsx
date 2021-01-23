import * as React from 'react';
import { RedButton, BucketIcon } from '../../atoms';

type props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

export const DeleteButton: React.FC<props> = React.memo(({onClick}) => {
  return (
    <RedButton onClick={onClick}>
      <BucketIcon />
    </RedButton>
  );
});
