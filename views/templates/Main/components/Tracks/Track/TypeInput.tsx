import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrack, updateTrack, Types } from '../../../../../../redux/audio';

type props = {
  id: string
};

export const TypeInput: React.FC<props> = ({ id }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: Types.state) => state);
  const track: Types.track = getTrack(selector, id);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTrack: Types.track = {
      ...track,
      type: e.target.value as Types.wave
    };
    dispatch(updateTrack(newTrack));
  };

  return (
    <select value={track.type} onChange={onChange}>
      <option value="sine">sine</option>
      <option value="square">square</option>
      <option value="sawtooth">sawtooth</option>
      <option value="triangle">triangle</option>
    </select>
  );
};
