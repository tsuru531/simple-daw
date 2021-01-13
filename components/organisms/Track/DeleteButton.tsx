import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTrack } from '../../../redux/audio';

type props = {
  id: string
};

export const DeleteButton: React.FC<props> = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(deleteTrack(id))}>
      delete
    </button>
  );
};
