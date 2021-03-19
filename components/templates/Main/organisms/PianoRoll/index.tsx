import * as React from 'react';
import styled from 'styled-components';
import { KeyBoard } from '../../organisms';
import { Scroll } from './Scroll';

export const PianoRoll: React.FC = React.memo(() => {
  return (
    <FlexContainer>
      <FlexItemLeft>
        <KeyBoard />
      </FlexItemLeft>
      <FlexItemRight>
        <Scroll />
      </FlexItemRight>
    </FlexContainer>
  );
});

const FlexContainer = styled.div`
  width: 100%;
  min-width: 100%;
  height: 500%;
  display: flex;
`;

const FlexItemLeft = styled.div`
  flex-basis: 80px;
  height: 100%;
`;

const FlexItemRight = styled.div`
  flex-grow: 1;
  height: 100%;
`;
