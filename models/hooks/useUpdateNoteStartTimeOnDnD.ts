import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cursorPosition } from '../../models';
import { useMouseActive, useClickPosition } from '../hooks';
import { getNoteSize, updateNote, Types } from '../../redux/audio';

export const useUpdateNoteStartTimeOnDnD = <T extends EventTarget>(refObject: React.RefObject<T>, note: Types.note) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: Types.state) => state);
  const [startTimeFluctuation, setStartTimeFluctuation] = useState<number>(null);
  const [oldStartTime, setOldStartTime] = useState<number>(null);
  const clickPosition = useClickPosition(refObject);
  const isActive = useMouseActive(refObject);
  const noteSize: number = getNoteSize(selector);
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
