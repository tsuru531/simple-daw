import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNotesRef } from "../../../../../hooks"
import { getNotesForSelectedTrack, Types } from '../../../../../redux/audio';
import { Note } from './Note';

export const Notes: React.FC = React.memo(() => {
  const selector = useSelector((state: Types.state) => state);
  const notes: Types.note[] = getNotesForSelectedTrack(selector);
  const notesRef = useNotesRef();

  return (
    <Container ref={notesRef}>
      {notes.map(note => {
        return (
          <Note key={note.id} note={note} notesRef={notesRef}/>
        );
      })}
    </Container>
  );
});

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
