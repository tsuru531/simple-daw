import * as React from 'react';
import styled from 'styled-components';
import { Circle } from './Circle';

type props = {
  refObject: React.MutableRefObject<HTMLDivElement>;
};

export const MountRef: React.FC<props> = ({ children, refObject }) => {
  return (
    <Container>
      {children}
      <Ref ref={refObject}/>
    </Container>
  );
};

const Container = styled(Circle)`
  display: inline-block;
`;

const Ref = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
`;
