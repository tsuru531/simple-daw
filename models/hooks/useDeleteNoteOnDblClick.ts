import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMouseHover } from '../hooks';
import { deleteNote } from '../../redux/audio';

export const useDeleteNoteOnDblClick = (refObject: React.RefObject<SVGPathElement>, noteId: string): void => {
  const dispatch = useDispatch();
  const isHover = useMouseHover(refObject);

  useEffect(() => {
    const onDblClick = () => dispatch(deleteNote(noteId));

    if (isHover) refObject.current.addEventListener('dblclick', onDblClick);

    return () => {
      refObject.current.removeEventListener('dblclick', onDblClick);
    };
  }, [isHover]);
};
