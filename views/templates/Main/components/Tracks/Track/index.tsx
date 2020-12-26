import * as React from 'react';
import { TrackWrapper} from './TrackWrapper';
import { TypeInput } from './TypeInput';
import { TrackVolKnob } from './TrackVolKnob';
import { DeleteButton } from './DeleteButton';

type props = {
  trackId: string
};

export const Track: React.FC<props> = ({ trackId }) => {
  return (
    <TrackWrapper trackId={trackId}>
      id: {trackId}
      <TypeInput id={trackId} />
      <TrackVolKnob trackId={trackId} />
      <DeleteButton id={trackId} />
    </TrackWrapper>
  );
};
