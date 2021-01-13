import * as React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getNoteSize, getSelectedTrack, addNote, Types } from '../../../redux/audio';
import { Notes } from './Notes';

export const PianoRoll: React.FC = () => {
  const selector: Types.state = useSelector((state: Types.state) => state);
  const dispatch = useDispatch();
  const noteSize: number = getNoteSize(selector);
  const selectedTrackId: string = getSelectedTrack(selector);
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

  const onDoubleClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const svgElement = e.currentTarget;
    const clientRect = svgElement.getBoundingClientRect();
    const x = Math.round(e.clientX - clientRect.left);
    const y = Math.round(e.clientY - clientRect.bottom);

    const note: Types.noteState = {
      keyNum: Math.floor(-y / noteSize) + 1,
      startTime: Math.floor(x / noteSize),
      length: 1,
      trackId: selectedTrackId
    };
    dispatch(addNote(note));
  };

  return (
    <Container>
      <svg
        width={rollWidth}
        height={rollHeight}
        viewBox={`0, 0, ${rollWidth}, ${rollHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        onDoubleClick={onDoubleClick}
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