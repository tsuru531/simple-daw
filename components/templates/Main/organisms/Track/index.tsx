import * as React from 'react';
import { TrackContainer } from './TrackContainer';
import { TypeInput } from './TypeInput';
import { TrackVolKnob } from './TrackVolKnob';
import { DeleteTrackButton } from './DeleteTrackButton';

type props = {
  trackId: string
};

export const Track: React.FC<props> = React.memo(({ trackId }) => {
  return (
    <TrackContainer trackId={trackId}>
      <TypeInput id={trackId} />
      <TrackVolKnob trackId={trackId} />
      <DeleteTrackButton trackId={trackId} />
    </TrackContainer>
  );
});
