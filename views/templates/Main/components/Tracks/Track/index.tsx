import * as React from 'react';
import { TypeInput } from './TypeInput';
import { NoteInput } from './NoteInput';

type props = {
  id: string
};

export const Track: React.FC<props> = ({ id }) => {
  return (
    <div>
      id: {id}
      <TypeInput id={id} />
      <NoteInput />
    </div>
  );
};
