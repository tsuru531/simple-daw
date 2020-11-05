import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { play, stop } from '../../../../redux/audio/operations';
import { getIsPlaying } from '../../../../redux/audio/selectors';
import { Container } from './Container';
import { BpmInput } from './BpmInput';
import { ToolItems } from './ToolItems';

export const ToolBar: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
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
