import * as React from 'react';
import { useSelector } from 'react-redux';
import { getTrackVolPer, Types } from '../../../../../redux/audio';
import { useTrackVolKnob } from '../../../../../hooks/useTrackVolKnob';
import { PrimaryKnob, MountRef } from '../../../../app/molecules/knob/PrimaryKnob';

type props = {
  trackId: string
};

export const TrackVolKnob: React.FC<props> = React.memo(({ trackId }) => {
  const selecter = useSelector((state: Types.state) => state);
  const percentage = getTrackVolPer(selecter, trackId);
  const ref = useTrackVolKnob(trackId);

  return (
    <MountRef refObject={ref}>
      <PrimaryKnob percentage={percentage} />
    </MountRef>
  );
});
