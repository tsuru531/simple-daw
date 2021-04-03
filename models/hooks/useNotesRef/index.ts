import { useRef } from "react";
import { notesRef } from "./types";
import { useAddNoteOnDblClick } from "./useAddNoteOnDblClick";

export const useNotesRef = (): notesRef => {
  const notesRef = useRef<HTMLDivElement>(null);

  useAddNoteOnDblClick(notesRef);

  return notesRef;
};
