import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, Types } from '../../redux/audio';
import { cursorPosition } from '..';
import { useMouseActive, useClickPosition } from '.';

export const useUpdateNoteKeyNumOnDnD = (refObject: React.RefObject<SVGPathElement>, note: Types.note): void => {
  const dispatch = useDispatch();
  const [oldKeyNum, setOldKeyNum] = useState<number>(null);
  const [keyNumFluctuation, setKyeNumFluctuation] = useState<number>(null);
  const isActive = useMouseActive(refObject);
  const clickPosition = useClickPosition(refObject);
  const noteSize: number = 20;

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