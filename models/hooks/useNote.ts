import { useRef } from 'react';
import { useDeleteNoteOnDblClick, useUpdateKeyNumOnDnD } from '../hooks';
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
  useUpdateKeyNumOnDnD(noteRefs.body, note);

  return noteRefs;
};
