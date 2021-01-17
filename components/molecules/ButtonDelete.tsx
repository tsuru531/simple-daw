import * as React from 'react';
import { ButtonRed, IconBucket } from '../atoms';

type props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

export const ButtonDelete: React.FC<props> = React.memo(({onClick}) => {
  return (
    <ButtonRed onClick={onClick}>
      <IconBucket />
    </ButtonRed>
  );
});
