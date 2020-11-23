import * as React from 'react';
import styled from 'styled-components';
import { MasterVolKnob as Knob } from '../../../components/molecules';

export const MasterVolKnob: React.FC = () => {
  return (
    <Container>
      <Knob />
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  padding: 8px;
  background-color: inherit;
`;
