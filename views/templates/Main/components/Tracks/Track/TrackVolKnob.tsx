import * as React from 'react';
import { useSelector } from 'react-redux';
import { getTrackVolPer, Types } from '../../../../../../redux/audio';
import { useTrackVolKnob } from '../../../../../../models/hooks/useTrackVolKnob';
import { Knob, MountRef } from '../../../../../components/atoms/Knob';

type props = {
  id: string
};

export const TrackVolKnob: React.FC<props> = ({ id }) => {
  const selecter = useSelector((state: Types.state) => state);
  const percentage = getTrackVolPer(selecter, id);
  const ref = useTrackVolKnob(id);

  return (
    <MountRef refObject={ref}>
      <Knob percentage={percentage} />
    </MountRef>
  );
};
