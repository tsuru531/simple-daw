import * as React from 'react';
import { Types } from 'src/redux/audio';
import { Paint } from './Paint';
import { MountDelete } from './MountDelete';

type props = {
  note: Types.note,
  noteSize: number,
}

export const Note: React.FC<props> = ({ note, noteSize }) => {
  const rollHeight: number = noteSize * 127;
  const x: number = noteSize * note.startTime;
  const y: number = rollHeight - noteSize * note.keyNum;
  const d: string = `M 0 0 L 0 ${noteSize} L ${noteSize * note.length} ${noteSize} L ${noteSize * note.length} 0`;

  return (
    <g transform={`matrix(1, 0, 0, 1, ${x}, ${y})`}>
      <Paint d={d} />
      <MountDelete d={d} noteId={note.id} />
    </g>
  );
};