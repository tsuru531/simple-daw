import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, Types } from '../../../redux/audio';
import { cursorPosition } from '../../../models';
import { useClickPosition, useMouseActive } from '../../hooks';

type values = {
  startTime: number,
  length: number
};

export const useUpdateNoteStartTimeAndLengthOnDnD = <T extends EventTarget>(refObject: React.RefObject<T>, note: Types.note) => {
  const dispatch = useDispatch();
  const [fluctuations, setFluctuations] = useState<number>(null);
  const [oldValues, setOldValues] = useState<values>(null);
  const noteSize: number = 20;
  const clickPosition = useClickPosition(refObject);
  const isActive = useMouseActive(refObject);
  const step: number = 2;

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const cursorXPositionFrom = cursorPosition(e, "x");
      const distance: number = cursorXPositionFrom(clickPosition.x);
      const fluctuation: number = Math.trunc((distance / noteSize) * step) / step;

      if (fluctuation !== fluctuations) setFluctuations(fluctuation);
    };

    if (isActive && clickPosition) {
      window.addEventListener('mousemove', onMouseMove);
      setOldValues({startTime: note.startTime, length: note.length});
    };

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      setFluctuations(null);
    };
  }, [isActive, clickPosition]);

  useEffect(() => {
    if (fluctuations !== null) {
      const newValues: values = {
        startTime: oldValues.startTime + fluctuations,
        length: oldValues.length - fluctuations
      };

      if (newValues.length > 0) {
        const newNote: Types.note = {
          ...note,
          ...newValues
        };

        dispatch(updateNote(newNote));
      };
    };
  }, [fluctuations]);
};
