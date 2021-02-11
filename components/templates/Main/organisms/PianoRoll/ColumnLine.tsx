import * as React from 'react';
import styled from 'styled-components';

export const ColumnLine: React.FC = React.memo(() => {
  const beatsPerBar: number = 4;
  const bar: number = 2;

  const items = [];
  for (let i = 0; i < beatsPerBar * bar; i++) {
    items.push(<FlexItem key={i} />);
  };

  return (
    <FlexContainer>
      {items}
    </FlexContainer>
  );
});

const FlexContainer = styled.div`
  width: 100%;
  height: 0;
  display: flex;
`;

const FlexItem = styled.div`
  flex-grow: 1;

  & + &:before {
    content: '';
    border-left: solid 1px black;
    position: absolute;
    height: 100%;
    margin-left: -1px;
  }
`;
