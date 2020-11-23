import * as React from 'react';
import { useSelector } from 'react-redux';
import { getTrackVolPer, Types } from '../../../redux/audio';
import { useTrackVolKnob } from '../../../models/hooks/useTrackVolKnob';
import { Knob, MountRef } from '../../components/atoms/Knob';

type props = {
  trackId: string
};

export const TrackVolKnob: React.FC<props> = ({ trackId }) => {
  const selecter = useSelector((state: Types.state) => state);
  const percentage = getTrackVolPer(selecter, trackId);
  const ref = useTrackVolKnob(trackId);

  return (
    <MountRef refObject={ref}>
      <Knob percentage={percentage} />
    </MountRef>
  );
};
