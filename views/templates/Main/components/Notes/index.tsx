import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes, deleteNote, Types } from '../../../../../redux/audio';
import { Note } from './Note';
import { NotesWrapper } from './NotesWrapper';

export const Notes: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const notes: Types.note[] = getNotes(selector);

  return (
    <NotesWrapper>
      <ul>
        {notes.map((note) => {
          return (
            <li key={note.id} data-noteid={note.id}>
              <Note
                keyNum={note.keyNum}
                startTime={note.startTime}
                length={note.length}
              />
              <button type='button' onClick={() => {dispatch(deleteNote(note.id))}}>delete</button>
            </li>
          );
        })}
      </ul>
    </NotesWrapper>
  );
};
