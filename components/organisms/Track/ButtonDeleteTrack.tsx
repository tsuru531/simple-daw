import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTrack } from '../../../redux/audio';
import { ButtonDelete } from '../../molecules'

type props = {
  trackId: string
};

export const ButtonDeleteTrack: React.FC<props> = React.memo(({ trackId }) => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(deleteTrack(trackId));

  return <ButtonDelete onClick={onClick} />;
});
