import * as React from 'react';
import { useSelector } from 'react-redux';
import { getNotesForSelectedTrack, Types } from '../../../../redux/audio';
import { Note } from './Note';

export const Notes: React.FC = () => {
  const selecter = useSelector((state: Types.state) => state);
  const notes: Types.note[] = getNotesForSelectedTrack(selecter);

  return (
    <g>
      {notes.map(note => {
        return (
          <Note key={note.id} note={note} />
        )
      })}
    </g>
  );
};
