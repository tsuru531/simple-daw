import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, Types } from '../../../redux/audio';
import { cursorPosition } from '../../../models';
import { useClickPosition, useMouseActive } from '../../hooks';

export const useUpdateNoteLengthOnDnD = <T extends EventTarget>(refObject: React.RefObject<T>, note: Types.note) => {
  const dispatch = useDispatch();
  const [lengthFluctuation, setLengthFluctuation] = useState<number>(null);
  const [oldLength, setOldLength] = useState<number>(null);
  const noteSize: number = 20;
  const clickPosition = useClickPosition(refObject);
  const isActive = useMouseActive(refObject);
  const step: number = 2;

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const cursorXPositionFrom = cursorPosition(e, "x");
      const distance: number = cursorXPositionFrom(clickPosition.x);
      const fluctuation: number = Math.trunc((distance / noteSize) * step) / step;

      if (fluctuation !== lengthFluctuation) setLengthFluctuation(fluctuation);
    };

    if (isActive && clickPosition) {
      window.addEventListener('mousemove', onMouseMove);
      setOldLength(note.length);
    };

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      setLengthFluctuation(null);
    };
  }, [isActive, clickPosition]);

  useEffect(() => {
    if (lengthFluctuation !== null) {
      const newLength: number = oldLength + lengthFluctuation;

      if (newLength > 0) {
        const newNote: Types.note = {
          ...note,
          length: newLength
        };

        dispatch(updateNote(newNote));
      };
    };
  }, [lengthFluctuation]);
};
