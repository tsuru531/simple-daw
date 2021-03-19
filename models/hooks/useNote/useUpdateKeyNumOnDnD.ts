import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, Types } from '../../../redux/audio';

export const useUpdateKeyNumOnDnD = (refObject: React.RefObject<HTMLDivElement>, note: Types.note): void => {
  const dispatch = useDispatch();
  const [clickYPosition, setClickYPosition] = useState<number>(null);
  const [cursorYPosition, setCursorYPosition] = useState<number>(null);
  const [targetHeight, setTargetHeight] = useState<number>(null);
  const [oldKeyNum, setOldKeyNum] = useState<number>(null);
  const [fluctuation, setFluctuation] = useState<number>(null);
  const renderRef = useRef<boolean>(false);

  useEffect(() => {
    const target = refObject.current;

    const onMouseDown = (e: MouseEvent): void => {
      window.addEventListener('mousemove', windowMouseMove);
      window.addEventListener('mouseup', windowMouseUp);
      target.removeEventListener('mousedown', onMouseDown);

      setClickYPosition(e.clientY);
      setTargetHeight(target.getBoundingClientRect().height);
    };

    const windowMouseMove = (e: MouseEvent): void => {
      setCursorYPosition(e.clientY);
    };

    const windowMouseUp = (): void => {
      target.addEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', windowMouseMove);
      window.removeEventListener('mouseup', windowMouseUp);
    };

    target.addEventListener('mousedown', onMouseDown);

    return () => {
      target.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', windowMouseMove);
      window.removeEventListener('mouseup', windowMouseUp);
    };
  }, []);

  useEffect(() => {
    setOldKeyNum(note.keyNum);
  }, [clickYPosition]);

  useEffect(() => {
    if (renderRef.current) {
      setFluctuation(Math.trunc(((cursorYPosition - clickYPosition) * -1) / targetHeight));
    };
  }, [cursorYPosition]);

  useEffect(() => {
    if (renderRef.current) {
      const newKeyNum: number = oldKeyNum + fluctuation;
      const newNote: Types.note = {
        ...note,
        keyNum: newKeyNum
      };
      dispatch(updateNote(newNote));
    };
  }, [fluctuation]);

  useEffect(() => {
    renderRef.current = true;
  }, []);
};
