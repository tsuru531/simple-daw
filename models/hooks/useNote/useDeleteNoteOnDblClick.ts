import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../../redux/audio';

export const useDeleteNoteOnDblClick = (refObject: React.RefObject<EventTarget>, noteId: string): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    const note: EventTarget = refObject.current;
    const onDblClick = () => dispatch(deleteNote(noteId));

    note.addEventListener('dblclick', onDblClick);

    return () => {
      note.removeEventListener('dblclick', onDblClick);
    };
  });
};
