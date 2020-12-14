import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getNoteSize, Types } from '../../../../redux/audio';
import { Notes } from './Notes';

export const PianoRoll: React.FC = () => {
  const selector: Types.state = useSelector((state: Types.state) => state);
  const noteSize: number = getNoteSize(selector);
  const beatsPerBar: number = 4;
  const numberOfBar: number = 4;
  const rollHeight: number = noteSize * 127;
  const rollWidth: number = noteSize * beatsPerBar * numberOfBar;

  const lineLists = [];
  for (let i = 0; i < (beatsPerBar * numberOfBar + 1); i++) {
    lineLists.push({
      x1: noteSize * i,
      y1: 0,
      x2: noteSize * i,
      y2: rollHeight,
      key: `column${i}`,
    });
  };
  for (let i = 0; i < 127 + 1; i++) {
    lineLists.push({
      x1: 0,
      y1: noteSize * i,
      x2: rollWidth,
      y2: noteSize * i,
      key: `row${i}`,
    });
  };

  return (
    <Container>
      <svg
        width={rollWidth}
        height={rollHeight}
        viewBox={`0, 0, ${rollWidth}, ${rollHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {lineLists.map(item => {
            return (
              <line
                x1={item.x1}
                y1={item.y1}
                x2={item.x2}
                y2={item.y2}
                stroke="black"
                strokeWidth="1"
                key={item.key}
              />
            )
          })}
        </g>
        <Notes />
      </svg>
    </Container>
  );
};

const Container = styled.div`
  overflow: scroll;
  height: 100%;
  width: 100%;
`;
