import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, Types } from '../../../redux/audio';

export const useDeleteNoteOnDblClick = (refObject: React.RefObject<HTMLDivElement>, note: Types.note): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    const target: HTMLDivElement = refObject.current;
    const onDblClick = () => dispatch(deleteNote(note.id));

    target.addEventListener('dblclick', onDblClick);

    return () => {
      target.removeEventListener('dblclick', onDblClick);
    };
  }, []);
};
