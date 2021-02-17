import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getNotesForSelectedTrack, Types } from '../../../../../redux/audio';
import { Note } from './Note';

export const Notes: React.FC = React.memo(() => {
  const selector = useSelector((state: Types.state) => state);
  const notes: Types.note[] = getNotesForSelectedTrack(selector);

  return (
    <Container>
      {notes.map(note => {
        return (
          <Note key={note.id} note={note} />
        );
      })}
    </Container>
  );
});

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
