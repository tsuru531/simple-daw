import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addTrack } from '../../../redux/audio';
import { AddIcon } from '../atoms';

export const AddTrackButton: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  return (
    <Button type='button' onClick={() => dispatch(addTrack())}>
      <Centering>
        <AddIcon />
      </Centering>
    </Button>
  );
});

const Button = styled.button`
  width: 100%;
  height: 62px;
  border-top: solid 1px #888888;
  border-bottom: solid 1px #888888;
`;

const Centering = styled.div`
  display: inline-block;
`;
