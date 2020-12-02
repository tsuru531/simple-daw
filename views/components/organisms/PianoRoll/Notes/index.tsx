import * as React from 'react';
import { useSelector } from 'react-redux';
import { getNotesForSelectedTrack, Types } from '../../../../../redux/audio';
import { Note } from './Note';

type props = {
  noteSize: number
};

export const Notes: React.FC<props> = ({ noteSize }) => {
  const selecter = useSelector((state: Types.state) => state);
  const notes: Types.note[] = getNotesForSelectedTrack(selecter);


  return (
    <g>
      {notes.map(note => {
        return (
          <Note key={note.id} note={note} noteSize={noteSize} />
        )
      })}
    </g>
  );
};
