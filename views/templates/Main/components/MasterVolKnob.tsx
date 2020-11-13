import * as React from 'react';
import { useSelector } from 'react-redux';
import { getMasterVolPer, Types } from '../../../../redux/audio';
import { useMasterVolKnob } from '../../../../models/hooks/useMasterVolKnob';
import { Knob } from '../../../components/atoms';

export const MasterVolKnob: React.FC = () => {
  const selecter = useSelector((state: Types.state) => state);
  const percentage = getMasterVolPer(selecter);
  const ref = useMasterVolKnob();

  return <Knob percentage={percentage} refObject={ref} />;
};
