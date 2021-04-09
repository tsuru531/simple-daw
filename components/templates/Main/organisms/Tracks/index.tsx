import * as React from 'react';
import { useSelector } from 'react-redux';
import { getTracks, Types } from '../../../../../redux/audio';
import { TracksWrapper } from './TracksWrapper';
import { AddTrackButton } from './AddTrackButton';
import { Track } from '../../organisms';

export const Tracks: React.FC = React.memo(() => {
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
      <AddTrackButton />
    </TracksWrapper>
  );
});
