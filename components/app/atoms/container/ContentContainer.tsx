import * as React from 'react';
import styled from 'styled-components';

export const ContentContainer: React.FC = React.memo(({ children }) => {
  return (
    <Container>
      <Inner>
        {children}
      </Inner>
    </Container>
  );
});

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  background-color: #515151;
  border-radius: 8px;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;
