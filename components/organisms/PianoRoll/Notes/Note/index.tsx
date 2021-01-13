import * as React from 'react';
import { useSelector } from 'react-redux';
import { getNoteSize, Types } from '../../../../../redux/audio';
import { useNote } from '../../../../../models/hooks';
import { Body } from './Body';
import { Right } from './Right';
import { Left } from './Left';

type props = {
  note: Types.note
};

type d = {
  body: string,
  right: string,
  left: string
};

export const Note: React.FC<props> = ({ note }) => {
  const selector: Types.state = useSelector((state: Types.state) => state);
  const noteSize: number = getNoteSize(selector);
  const noteRefs = useNote(note);
  const rollHeight: number = noteSize * 127;
  const x: number = noteSize * note.startTime;
  const y: number = rollHeight - noteSize * note.keyNum;
  const d: d = {
    body: `M 0 0 L 0 ${noteSize} L ${noteSize * note.length} ${noteSize} L ${noteSize * note.length} 0`,
    right: `M ${noteSize * note.length} 0 L ${noteSize * note.length} ${noteSize} L ${(noteSize * note.length) - 4} ${noteSize} L ${(noteSize * note.length) - 4} 0`,
    left: `M 0 0 L 0 ${noteSize} L 4 ${noteSize} L 4 0`
  };

  return (
    <g transform={`matrix(1, 0, 0, 1, ${x}, ${y})`}>
      <Body d={d.body} refObject={noteRefs.body} />
      <Right d={d.right} refObject={noteRefs.right} />
      <Left d={d.left} refObject={noteRefs.left} />
    </g>
  );
};
