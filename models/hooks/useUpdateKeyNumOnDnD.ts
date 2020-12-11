import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, Types } from '../../redux/audio';
import { cursorPosition } from '../../models';
import { useMouseHover, useMouseActive } from '../hooks';

type position = {
  x: number,
  y: number
};

export const useUpdateKeyNumOnDnD = (refObject: React.RefObject<SVGPathElement>, note: Types.note): void => {
  const dispatch = useDispatch();
  const [clickPosition, setClickPosition] = useState<position>(null);
  const [oldKeyNum, setOldKeyNum] = useState<number>(null);
  const [keyNumFluctuation, setKyeNumFluctuation] = useState<number>(null);
  const isHover = useMouseHover(refObject);
  const isActive = useMouseActive(refObject);
  const noteSize: number = 20;

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      setClickPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    if (isHover) window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
    };

  }, [isHover]);

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