import * as React from 'react';
import { NoteInput } from '../';

type props = {
  id: string
};

export const Track: React.FC<props> = ({ id }) => {
  return (
    <div>
      <p>id: {id}</p>
      <NoteInput />
    </div>
  );
};