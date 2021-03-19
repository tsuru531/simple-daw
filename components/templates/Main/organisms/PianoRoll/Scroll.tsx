import * as React from 'react';
import styled from 'styled-components';
import { ColumnLine } from './ColumnLine';
import { RowLine } from './RowLine';
import { Notes } from './Notes';

const bar: number = 2;

export const Scroll: React.FC = React.memo(() => {
  return (
    <Container>
      <ColumnLine />
      <FlexContainer>
        <RowLine />
        <Notes />
      </FlexContainer>
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  height: 100%;
  background-color: rgba(0, 0, 0, .05);
  background-image:
    linear-gradient(
      transparent       ${(1 / 12) * 100}%,
      rgba(0, 0, 0, .1) ${(1 / 12) * 100}% ${(2 / 12) * 100}%,
      transparent       ${(2 / 12) * 100}% ${(3 / 12) * 100}%,
      rgba(0, 0, 0, .1) ${(3 / 12) * 100}% ${(4 / 12) * 100}%,
      transparent       ${(4 / 12) * 100}% ${(5 / 12) * 100}%,
      transparent       ${(5 / 12) * 100}% ${(6 / 12) * 100}%,
      rgba(0, 0, 0, .1) ${(6 / 12) * 100}% ${(7 / 12) * 100}%,
      transparent       ${(7 / 12) * 100}% ${(8 / 12) * 100}%,
      rgba(0, 0, 0, .1) ${(8 / 12) * 100}% ${(9 / 12) * 100}%,
      transparent       ${(9 / 12) * 100}% ${(10 / 12) * 100}%,
      rgba(0, 0, 0, .1) ${(10 / 12) * 100}% ${(11 / 12) * 100}%,
      transparent       ${(11 / 12) * 100}%
    ),
    linear-gradient(
      90deg,
      rgba(0, 0, 0, .05) 50%,
      transparent 50%
    );
  background-size: ${(2 / bar) * 100}% ${(100 / 127) * 12}%;
  background-position: 0 2.63%;
`;

const FlexContainer = styled.div`
  display: flex;
  height: 100%;
`;
