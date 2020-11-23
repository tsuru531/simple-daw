import * as React from 'react';
import { useSelector } from 'react-redux';
import { getMasterVolPer, Types } from '../../../../redux/audio';
import { useMasterVolKnob } from '../../../../models/hooks/useMasterVolKnob';
import { Knob, MountRef } from '../../../components/atoms/Knob';

export const MasterVolKnob: React.FC = () => {
  const selecter = useSelector((state: Types.state) => state);
  const percentage = getMasterVolPer(selecter);
  const ref = useMasterVolKnob();

  return (
    <MountRef refObject={ref}>
      <Knob percentage={percentage} />
    </MountRef>
  );
};
