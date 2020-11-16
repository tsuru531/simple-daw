import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack, getTracks, Types } from '../../../../../redux/audio';
import { Track } from './Track';
import { TracksWrapper } from './TracksWrapper';

export const Tracks: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const tracks = getTracks(selector as Types.state);

  return (
    <TracksWrapper>
      {tracks.map(track => {
        const id = track.id;
        return <Track id={id} />
      })}
      <button onClick={() => dispatch(addTrack())}>addTrack</button>
    </TracksWrapper>
  );
};
