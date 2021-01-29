import * as React from 'react';
import styled from 'styled-components';

type props = {
  color: color
};

export type color = "black" | "white";

export const Key: React.FC<props> = React.memo(({children, color}) => {
  return (
      <FlexContainer>
        <Scale>{children}</Scale>
        <Color color={color}/>
      </FlexContainer>
  );
});

const FlexContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const Scale = styled.div`
  height: 100%;
  padding: 0 4px;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Color = styled.div<props>`
  width: 20px;
  height: 100%;
  ${props => props.color === 'black' && `
  background-color: black;
  `}
  ${props => props.color === 'white' && `
  background-color: white;
  `}
`;
