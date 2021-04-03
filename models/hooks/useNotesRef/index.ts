import * as React from "react";
import { useRef } from "react";

type notesRef = React.MutableRefObject<HTMLDivElement>;

export const useNotesRef = (): notesRef => {
  const notesRef = useRef<HTMLDivElement>(null);

  return notesRef;
};
