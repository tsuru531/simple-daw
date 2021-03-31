import * as React from 'react';
import styled from 'styled-components';
import { useNote } from '../../../../../models/hooks';
import { Types } from '../../../../../redux/audio';

type props = {
  note: Types.note,
  notesRef: React.RefObject<HTMLDivElement>
};

const scaleCount: number = 127;
const beatsPerBar: number = 4;
const bar: number = 2;

export const Note: React.FC<props> = React.memo(({...props}) => {
  const noteRefs = useNote(props.note, props.notesRef);

  return (
    <FlexContainer note={props.note}>
      <End ref={noteRefs.left} />
      <Body ref={noteRefs.body} />
      <End ref={noteRefs.right} />
    </FlexContainer>
  );
});

const FlexContainer = styled.div<{
  note: Types.note
}>`
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
