import * as React from 'react';
import { useSelector } from 'react-redux';
import { getNotes, Types } from '../../../../../redux/audio';
import { Note } from './Note';
import { NotesWrapper } from './NotesWrapper';

export const Notes: React.FC = () => {
  const selector = useSelector(state => state);
  const notes: Types.note[] = getNotes(selector);

  return (
    <NotesWrapper>
      <ul>
        {notes.map((note) => {
          return (
            <li key={note.id}>
              <Note
                keyNum={note.keyNum}
                startTime={note.startTime}
                length={note.length}
              />
            </li>
          );
        })}
      </ul>
    </NotesWrapper>
  );
};
