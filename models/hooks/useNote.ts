import { useRef } from 'react';
import {
  useDeleteNoteOnDblClick,
  useUpdateNoteKeyNumOnDnD,
  useUpdateNoteStartTimeOnDnD,
  useUpdateNoteLengthOnDnD,
  useUpdateNoteStartTimeAndLengthOnDnD
} from '../hooks';
import { Types } from '../../redux/audio';

type noteRefs = {
  body: React.RefObject<SVGPathElement>,
  right: React.RefObject<SVGPathElement>,
  left: React.RefObject<SVGPathElement>,
};

export const useNote = (note: Types.note): noteRefs => {
  const bodyRef: React.RefObject<SVGPathElement> = useRef<SVGPathElement>();
  const rightRef: React.RefObject<SVGPathElement> = useRef<SVGPathElement>();
  const leftRef: React.RefObject<SVGPathElement> = useRef<SVGPathElement>();
  const noteRefs: noteRefs = {
    body: bodyRef,
    right: rightRef,
    left: leftRef,
  };

  useDeleteNoteOnDblClick(noteRefs.body, note.id);
  useUpdateNoteKeyNumOnDnD(noteRefs.body, note);
  useUpdateNoteStartTimeOnDnD(noteRefs.body, note);
  useUpdateNoteLengthOnDnD(noteRefs.right, note);
  useUpdateNoteStartTimeAndLengthOnDnD(noteRefs.left, note);

  return noteRefs;
};
