import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Types,
  getSelectedTrack,
  getScaleCount,
  getAllBeats,
  addNote
} from "../../../redux/audio";
import { getClickPositionInElement } from "./getClickPositionInElement";
import { notesRef, position } from "./types";

export const useAddNoteOnDblClick = (notesRef: notesRef): void => {
  const dispatch = useDispatch();
  const selector = useSelector((state: Types.state) => state);
  
  const onDblClick = (e: MouseEvent): void => {
    const selectedTrackId: string = getSelectedTrack(selector);
    const scaleCount: number = getScaleCount(selector);
    const allBeats: number = getAllBeats(selector);
    const clickPosition: position = getClickPositionInElement(e, notesRef);
    const notesWidth: number = notesRef.current.clientWidth;
    const noteWidth: number = notesWidth / allBeats;
    const notesHeight: number = notesRef.current.clientHeight;
    const noteHeight: number = notesHeight / scaleCount;

    const keyNum: number = Math.floor( (notesHeight - clickPosition.y) / noteHeight );
    const startTime: number = Math.floor( clickPosition.x / noteWidth );

    const note: Types.noteState = {
      keyNum: keyNum,
      startTime: startTime,
      length: 1,
      trackId: selectedTrackId,
    };

    dispatch(addNote(note));
  };

  useEffect(() => {
    notesRef.current.addEventListener('dblclick', onDblClick);
    return () => notesRef.current.removeEventListener('dblclick', onDblClick);
  });
};
