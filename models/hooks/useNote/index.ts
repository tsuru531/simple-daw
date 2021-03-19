import { useRef } from 'react';
import { Types } from '../../../redux/audio';
import { useDeleteNoteOnDblClick } from './useDeleteNoteOnDblClick';
import { useUpdateKeyNumOnDnD } from './useUpdateKeyNumOnDnD';
import { useUpdateStartTimeOnDnD } from './useUpdateStartTimeOnDnD';

export type noteRefs = {
  body: React.RefObject<HTMLDivElement>,
  left: React.RefObject<HTMLDivElement>,
  right: React.RefObject<HTMLDivElement>,
};

export const useNote = (note: Types.note): noteRefs => {
  const bodyRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const rightRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const leftRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const noteRefs: noteRefs = {
    body: bodyRef,
    left: leftRef,
    right: rightRef,
  };

  useDeleteNoteOnDblClick(noteRefs.body, note);
  useUpdateKeyNumOnDnD(noteRefs.body, note);
  useUpdateStartTimeOnDnD(noteRefs.body, note);

  return noteRefs;
};
