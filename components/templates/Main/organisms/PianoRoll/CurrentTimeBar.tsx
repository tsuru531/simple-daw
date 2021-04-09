import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getCurrentTimePercentage, Types } from '../../../../../redux/audio';

export const CurrentTimeBar: React.FC = React.memo(() => {
  const selector = useSelector((state: Types.state) => state);
  const leftPercentage: number = getCurrentTimePercentage(selector);
  return (
    <Container>
      <Item style={{left: `${leftPercentage}%`}} />
    </Container>
  );
});

const Container = styled.div`
  width: 100%;
  height: 0;
`;

const Item = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  border-left: solid 1px #000;
`;
