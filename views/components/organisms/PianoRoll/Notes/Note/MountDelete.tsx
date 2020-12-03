import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../../../../../redux/audio';

type props = {
  d: string,
  noteId: string,
};

export const MountDelete: React.FC<props> = ({ d, noteId }) => {
  const dispatch = useDispatch();

  return (
    <path
      d={d}
      fillOpacity="0"
      strokeOpacity="0"
      onDoubleClick={() => {dispatch(deleteNote(noteId))}}
    />
  );
};
