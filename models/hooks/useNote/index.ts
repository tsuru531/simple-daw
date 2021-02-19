import { useRef } from 'react';
import { Types } from '../../../redux/audio';
import { useDeleteNoteOnDblClick } from './useDeleteNoteOnDblClick';

export type noteRefs = {
  body: React.MutableRefObject<EventTarget>,
  left: React.MutableRefObject<EventTarget>,
  right: React.MutableRefObject<EventTarget>,
};

export const useNote = (note: Types.note): noteRefs => {
  const bodyRef: React.MutableRefObject<EventTarget> = useRef<EventTarget>(null);
  const rightRef: React.RefObject<EventTarget> = useRef<EventTarget>(null);
  const leftRef: React.RefObject<EventTarget> = useRef<EventTarget>(null);
  const noteRefs: noteRefs = {
    body: bodyRef,
    left: leftRef,
    right: rightRef,
  };

  useDeleteNoteOnDblClick(noteRefs.body, note.id);

  return noteRefs;
};
