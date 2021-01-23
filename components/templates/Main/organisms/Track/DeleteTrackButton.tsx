import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTrack } from '../../../../../redux/audio';
import { DeleteButton } from '../../../../app/molecules';

type props = {
  trackId: string
};

export const DeleteTrackButton: React.FC<props> = React.memo(({ trackId }) => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(deleteTrack(trackId));

  return <DeleteButton onClick={onClick} />;
});
