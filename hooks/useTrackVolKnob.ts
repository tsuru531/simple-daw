import { useSelector, useDispatch } from 'react-redux';
import { getTrackVol, setTrackVol, Types } from '../redux/audio';
import { useKnob } from './useKnob';

export const useTrackVolKnob = (id: string) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: Types.state) => state);
  const volume: number = getTrackVol(selector, id);
  const step: number = 0.02;

  const ref = useKnob(volume, (vol: number) => dispatch(setTrackVol(id, vol)) , step);

  return ref;
};
