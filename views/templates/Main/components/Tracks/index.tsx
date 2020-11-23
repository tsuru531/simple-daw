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
      <ul>
        {tracks.map(track => {
          const trackId = track.id;
          return (
            <li key={trackId}>
              <Track trackId={trackId} />
            </li>
          )
        })}
      </ul>
      <button onClick={() => dispatch(addTrack())}>addTrack</button>
    </TracksWrapper>
  );
};
