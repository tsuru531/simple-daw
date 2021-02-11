import * as React from 'react';
import styled from 'styled-components';

export const RowLine: React.FC = React.memo(() => {
  const scale: number = 127;

  const items = [];
  for (let i = 0; i < scale; i++) {
    items.push(<FlexItem key={i} />);
  };

  return (
    <FlexContainer>
      {items}
    </FlexContainer>
  );
});

const FlexContainer = styled.div`
  width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FlexItem = styled.div`
  flex-grow: 1;

  & + &:before {
    content: '';
    border-top: solid 1px black;
    position: absolute;
    width: 100%;
    margin-top: -1px;
  }
`;
