import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBpm, setBpm } from '../../../../redux/audio';

export const BpmInput: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const bpm = getBpm(selector);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = Number(e.target.value);
    dispatch(setBpm(value));
  };

  return (
    <input type='number' value={bpm} onChange={onChange} />
  );
};
