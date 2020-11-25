import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getNotesForSelectedTrack, Types } from '../../../../redux/audio';

export const Notes: React.FC = () => {
  const selecter = useSelector((state: Types.state) => state);
  const notes: Types.note[] = getNotesForSelectedTrack(selecter);
  const noteHeight: number = 10;
  const noteWidth: number = 20;
  const beatsPerBar: number = 4;
  const numberOfBar: number = 4;
  const rollHeight: number = noteHeight * 127;
  const rollWidth: number = noteWidth * beatsPerBar * numberOfBar;

  const lineLists = [];
  for (let i = 0; i < (beatsPerBar * numberOfBar + 1); i++) {
    lineLists.push({
      x1: 20 * i,
      y1: 0,
      x2: 20 * i,
      y2: rollHeight,
    });
  };
  for (let i = 0; i < 127 + 1; i++) {
    lineLists.push({
      x1: 0,
      y1: 10 * i,
      x2: rollWidth,
      y2: 10 * i,
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
              />
            )
          })}
        </g>
        <g>
          {notes.map(note => {
            return (
              <rect
                key={note.id}
                x={note.startTime * noteWidth}
                y={rollHeight - note.keyNum * noteHeight}
                width={note.length * noteWidth}
                height={noteHeight}
                fill="yellow"
              />
            )
          })}
        </g>
      </svg>
    </Container>
  );
};

const Container = styled.div`
  overflow: scroll;
  height: 100%;
  width: 100%;
`;
