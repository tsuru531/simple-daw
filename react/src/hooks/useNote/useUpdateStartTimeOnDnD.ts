import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, Types } from '../../redux/audio';
import { useDnD } from './useDnD';

export const useUpdateStartTimeOnDnD = (
  refObject: React.RefObject<HTMLDivElement>,
  note: Types.note
): void => {
  const dispatch = useDispatch();
  const [clickXPosition, setClickXPosition] = useState<number>(null);
  const [cursorXPosition, setCursorXPosition] = useState<number>(null);
  const [targetWidth, setTargetWidth] = useState<number>(null);
  const [oldStartTime, setOldStartTime] = useState<number>(null);
  const [fluctuation, setFluctuation] = useState<number>(null);
  const renderRef = useRef<boolean>(false);
  
  const mouseDown = (e: MouseEvent) => {
    setClickXPosition(e.clientX);
    setTargetWidth(refObject.current.getBoundingClientRect().width);
  };
  const mouseMove = (e: MouseEvent) => {
    setCursorXPosition(e.clientX);
  };
  const mouseUp = () => {};

  useDnD(refObject, mouseDown, mouseMove, mouseUp);

  useEffect(() => {
    setOldStartTime(note.startTime);
  }, [clickXPosition]);

  useEffect(() => {
    if (renderRef.current) {
      setFluctuation(Math.trunc(((cursorXPosition - clickXPosition)) / (targetWidth / (note.length / .5))));
    };
  }, [cursorXPosition]);

  useEffect(() => {
    if (renderRef.current) {
      const newStartTime: number = oldStartTime + (fluctuation * .5);
      const newNote: Types.note = {
        ...note,
        startTime: newStartTime
      };
      dispatch(updateNote(newNote));
    };
  }, [fluctuation]);

  useEffect(() => {
    renderRef.current = true;
  }, []);
};
