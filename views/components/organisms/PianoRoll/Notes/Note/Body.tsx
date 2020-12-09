import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../../../../../redux/audio';

type props = {
  d: string,
  noteId: string
};

export const Body: React.FC<props> = ({ d, noteId }) => {
  const dispatch = useDispatch();

  return (
    <path
      fill="yellow"
      stroke="black"
      d={d}
      onDoubleClick={() => {dispatch(deleteNote(noteId))}}/>
  );
};
