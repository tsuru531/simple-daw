import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, getNoteSize, Types } from '../../redux/audio';
import { cursorPosition } from '../../models';
import { useMouseActive, useClickPosition } from '../hooks';

export const useUpdateNoteKeyNumOnDnD = <T extends EventTarget>(refObject: React.RefObject<T>, note: Types.note): void => {
  const dispatch = useDispatch();
  const selector = useSelector((state: Types.state) => state);
  const [oldKeyNum, setOldKeyNum] = useState<number>(null);
  const [keyNumFluctuation, setKyeNumFluctuation] = useState<number>(null);
  const isActive = useMouseActive(refObject);
  const clickPosition = useClickPosition(refObject);
  const noteSize: number = getNoteSize(selector);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const cursorYPositionFrom = cursorPosition(e, "y");
      const distance: number = cursorYPositionFrom(clickPosition.y);
      const fluctuation: number = Math.trunc(distance / -noteSize);

      if (fluctuation !== keyNumFluctuation) setKyeNumFluctuation(fluctuation);
    };

    if (isActive && clickPosition) {
      window.addEventListener('mousemove', onMouseMove);
      setOldKeyNum(note.keyNum);
    };

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      setKyeNumFluctuation(null);
    };
  }, [isActive, clickPosition]);

  useEffect(() => {
    if (keyNumFluctuation !== null) {
      const newKeyNum: number = oldKeyNum + keyNumFluctuation;
      const newNote: Types.note = {
        ...note,
        keyNum: newKeyNum
      };

      dispatch(updateNote(newNote));
    };
  }, [keyNumFluctuation]);
};