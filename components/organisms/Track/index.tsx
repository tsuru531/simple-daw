import * as React from 'react';
import { TrackWrapper} from './TrackWrapper';
import { TypeInput } from './TypeInput';
import { TrackVolKnob } from './TrackVolKnob';
import { ButtonDeleteTrack } from './ButtonDeleteTrack';

type props = {
  trackId: string
};

export const Track: React.FC<props> = ({ trackId }) => {
  return (
    <TrackWrapper trackId={trackId}>
      <TypeInput id={trackId} />
      <TrackVolKnob trackId={trackId} />
      <ButtonDeleteTrack trackId={trackId} />
    </TrackWrapper>
  );
};
