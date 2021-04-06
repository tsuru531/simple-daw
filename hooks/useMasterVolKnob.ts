import { useSelector, useDispatch } from 'react-redux';
import { getMasterVol, setMasterVol, Types } from '../redux/audio';
import { useKnob } from './useKnob';

export const useMasterVolKnob = () => {
  const dispatch = useDispatch();
  const selecter = useSelector((state: Types.state) => state);
  const volume: number = getMasterVol(selecter);
  const step: number = 0.01;
  const ref = useKnob(volume, (value) => {dispatch(setMasterVol(value))}, step);

  return ref;
};
