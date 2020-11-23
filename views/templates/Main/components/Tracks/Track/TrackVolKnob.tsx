import * as React from 'react';
import styled from 'styled-components';
import { TrackVolKnob as Knob } from '../../../../../components/molecules';

type props = {
  trackId: string
}

export const TrackVolKnob: React.FC<props> = ({ trackId }) => {
  return (
    <Container>
      <Knob trackId={trackId} />
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  padding: 8px;
  background-color: inherit;
`;
