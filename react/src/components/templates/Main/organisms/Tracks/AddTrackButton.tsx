import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addTrack } from '../../../../../redux/audio';
import { AddIcon } from '../../../../app/atoms';

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
  background-color: rgba(0, 0, 0, .05);
  border-top: solid 1px rgba(0, 0, 0, .1);
  border-bottom: solid 2px rgba(0, 0, 0, .1);
  cursor: pointer;
`;

const Centering = styled.div`
  display: inline-block;
`;
