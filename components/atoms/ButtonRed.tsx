import * as React from 'react';
import styled from 'styled-components';

type props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

export const ButtonRed: React.FC<props> = React.memo(({children, onClick}) => {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  );
});

const Button = styled.button`
  padding: 4px;
  background-color: red;
  border-radius: 4px;
`;
