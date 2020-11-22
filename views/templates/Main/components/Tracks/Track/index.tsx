import * as React from 'react';
import { TrackWrapper} from './TrackWrapper';
import { TypeInput } from './TypeInput';
import { TrackVolKnob } from './TrackVolKnob';
import { NoteInput } from './NoteInput';
import { DeleteButton } from './DeleteButton';

type props = {
  id: string
};

export const Track: React.FC<props> = ({ id }) => {
  return (
    <TrackWrapper trackId={id}>
      id: {id}
      <TypeInput id={id} />
      <TrackVolKnob id={id} />
      <NoteInput trackId={id} />
      <DeleteButton id={id} />
    </TrackWrapper>
  );
};
