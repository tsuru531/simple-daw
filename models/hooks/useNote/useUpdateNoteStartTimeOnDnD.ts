import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cursorPosition } from '../../../models';
import { useMouseActive, useClickPosition } from '../../hooks';
import { updateNote, Types } from '../../../redux/audio';

export const useUpdateNoteStartTimeOnDnD = <T extends EventTarget>(refObject: React.RefObject<T>, note: Types.note) => {
  const dispatch = useDispatch();
  const [startTimeFluctuation, setStartTimeFluctuation] = useState<number>(null);
  const [oldStartTime, setOldStartTime] = useState<number>(null);
  const clickPosition = useClickPosition(refObject);
  const isActive = useMouseActive(refObject);
  const noteSize: number = 20;
  const step: number = 2;

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const cursorXPositionFrom = cursorPosition(e, "x");
      const distance: number = cursorXPositionFrom(clickPosition.x);
      const fluctuation: number = Math.trunc((distance / noteSize) * step) / step;

      if (fluctuation !== startTimeFluctuation) setStartTimeFluctuation(fluctuation);
    };

    if (isActive && clickPosition) {
      window.addEventListener('mousemove', onMouseMove);
      setOldStartTime(note.startTime);
    };

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      setStartTimeFluctuation(null);
    };
  }, [isActive, clickPosition]);

  useEffect(() => {
    if (startTimeFluctuation !== null) {
      const newStartTime: number = oldStartTime + startTimeFluctuation;
      const newNote: Types.note = {
        ...note,
        startTime: newStartTime
      };

      dispatch(updateNote(newNote));
    };
  }, [startTimeFluctuation]);
};
