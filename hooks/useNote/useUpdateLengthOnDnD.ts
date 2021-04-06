import * as React from "react";
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateNote, getAllBeats, getFluctuationRange, Types } from "../../redux/audio";
import { useDnD } from "./useDnD";
import { useMovingDistance } from "./useMovingDistance";

export const useUpdateLengthOnDnD = (
  noteRef: React.RefObject<HTMLDivElement>,
  notesRef: React.RefObject<HTMLDivElement>,
  note: Types.note
) => {  
  const [oldLength, setOldLength] = useState<number>(null);
  const [isMouseDown, setMouseDown] = useState<boolean>(false);
  const [fluctuationValue, setFluctuationValue ] = useState<number>(null);
  const firstRender = useRef<boolean>(false);
  const dispatch  = useDispatch();
  const selector = useSelector((state: Types.state) => state);
  const allBeats = getAllBeats(selector);
  const fluctuationRange = getFluctuationRange(selector);
  const [movingDistance, setPosition] = useMovingDistance(null);
  
  const mouseDown = (e: MouseEvent) => {
    setPosition.down(e);
    setMouseDown(true);
  };
  const mouseMove = (e: MouseEvent) => {
    setPosition.cursor(e);
  };
  const mouseUp = () => {
    setMouseDown(false);
  };

  useDnD(noteRef, mouseDown, mouseMove, mouseUp);

  useEffect(() => {
    if (!firstRender.current) return;
    
    setOldLength(note.length);
  }, [isMouseDown]);

  useEffect(() => {
    if (!firstRender.current) return;

    const notesWidth: number = notesRef.current.clientWidth;
    setFluctuationValue(Math.trunc((movingDistance.x / (notesWidth / allBeats)) * 10) / 10);
  }, [movingDistance]);

  useEffect(() => {
    if (!firstRender.current) return;
    if (fluctuationValue % fluctuationRange !== 0) return;

    let newLength: number = oldLength + fluctuationValue;

    if (Math.sign(newLength) !== 1) {
      newLength = fluctuationRange;
    };

    const newNote: Types.note = {
      ...note,
      length: newLength
    };

    dispatch(updateNote(newNote));
  }, [fluctuationValue]);

  useEffect(() => {
    firstRender.current = true;
  }, []);
};
