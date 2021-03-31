import * as React from 'react';
import { useRef } from 'react';
import { Types } from '../../../redux/audio';
import { useDeleteNoteOnDblClick } from './useDeleteNoteOnDblClick';
import { useUpdateKeyNumOnDnD } from './useUpdateKeyNumOnDnD';
import { useUpdateStartTimeOnDnD } from './useUpdateStartTimeOnDnD';
import { useUpdateLengthOnDnD } from './useUpdateLengthOnDnD';
import { useUpdateStartTimeAndLengthOnDnD } from './useUpdateStartTimeAndLengthOnDnD';

export type noteRefs = {
  body: React.RefObject<HTMLDivElement>,
  left: React.RefObject<HTMLDivElement>,
  right: React.RefObject<HTMLDivElement>,
};

export const useNote = (note: Types.note, notesRef: React.RefObject<HTMLDivElement>): noteRefs => {
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
  useUpdateLengthOnDnD(noteRefs.right, notesRef, note);
  useUpdateStartTimeAndLengthOnDnD(noteRefs.left, notesRef, note);

  return noteRefs;
};
