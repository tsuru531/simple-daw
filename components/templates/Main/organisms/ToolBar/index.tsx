import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { play, stop, getIsPlaying, Types } from '../../../../../redux/audio';
import { Container } from './Container';
import { BpmInput } from './BpmInput';
import { ToolItems } from './ToolItems';

export const ToolBar: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: Types.state) => state);
  const isPlaying = getIsPlaying(selector);

  return (
    <Container>
      <BpmInput />
      {isPlaying ?
        <ToolItems.Stop onClick={() => dispatch(stop())} /> :
        <ToolItems.Play onClick={() => dispatch(play())} />
      }
    </Container>
  );
};
