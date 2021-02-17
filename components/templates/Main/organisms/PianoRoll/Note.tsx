import * as React from 'react';
import styled from 'styled-components';
import { Types } from '../../../../../redux/audio';

type props = {
  note: Types.note
};

const scaleCount: number = 127;
const beatsPerBar: number = 4;
const bar: number = 2;

export const Note: React.FC<props> = React.memo(({...props}) => {
  return (
    <FlexContainer note={props.note}>
      <End />
      <Body />
      <End />
    </FlexContainer>
  );
});

const FlexContainer = styled.div<props>`
  bottom: ${props => (100 / scaleCount) * props.note.keyNum}%;
  left: ${props => 100 / (beatsPerBar * bar) * props.note.startTime}%;
  width: ${props => (100 / (beatsPerBar * bar)) * props.note.length}%;
  height: ${100 / scaleCount}%;
  background-color: yellow;
  display: flex;
  position: absolute;
  border: solid 1px black;
  border-radius: 4px;
`;

const Body = styled.div`
  flex-grow: 1;
  height: 100%;
`;

const End = styled.div`
  flex-basis: 4px;
  height: 100%;
`;
