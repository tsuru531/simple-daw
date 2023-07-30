import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, Types } from '../../redux/audio';
import { useDnD } from './useDnD';

export const useUpdateKeyNumOnDnD = (refObject: React.RefObject<HTMLDivElement>, note: Types.note): void => {
  const dispatch = useDispatch();
  const [clickYPosition, setClickYPosition] = useState<number>(null);
  const [cursorYPosition, setCursorYPosition] = useState<number>(null);
  const [targetHeight, setTargetHeight] = useState<number>(null);
  const [oldKeyNum, setOldKeyNum] = useState<number>(null);
  const [fluctuation, setFluctuation] = useState<number>(null);
  const renderRef = useRef<boolean>(false);

  const mouseDown = (e: MouseEvent) => {
    setClickYPosition(e.clientY);
    setTargetHeight(refObject.current.getBoundingClientRect().height);
  };
  const mouseMove = (e: MouseEvent) => {
    setCursorYPosition(e.clientY);
  };
  const mouseUp = () => {};

  useDnD(refObject, mouseDown, mouseMove, mouseUp);

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
