import * as React from 'react';
import styled from 'styled-components';

type props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

export const DeleteButton: React.FC<props> = React.memo(({onClick}) => {
  return (
    <Button onClick={onClick}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#333"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </div>
    </Button>
  );
});

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(255, 255, 255, .2);
    cursor: pointer;
  }

  & > div {
    width: 24px;
    height: 24px;
    margin: 0 auto;
  }
`;
