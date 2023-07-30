import * as React from 'react';
import styled from 'styled-components';
import { Key, color } from './Key';

type key = {
  scale: string,
  color: color,
};

export const KeyBoard: React.FC = React.memo(() => {
  const keys: key[] = [];
  for (let i = 127; i > 0; i--) {
    const noteNumToScale = (noteNum: number): string => {
      const scaleList: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      const remainder: number = noteNum % 12;
      const octave: string = String(Math.floor(noteNum / 12) - 1);
      const scale: string = `${scaleList[remainder]}${octave}`;
      return scale;
    };
    const noteNumToColor = (noteNum: number): color => {
      const remainder: number = noteNum % 12;
      const colorList: color[] = ["white", "black", "white", "black", "white", "white", "black", "white", "black", "white", "black", "white"];
      const color: color = colorList[remainder];
      return color;
    };
    keys.push({
      scale: noteNumToScale(i),
      color: noteNumToColor(i)
    });
  };

  return (
    <FlexContainer>
      {keys.map(key => {
        return (
          <FlexItem key={key.scale}>
            <Key color={key.color}>{key.scale}</Key>
          </FlexItem>
        )
      })}
    </FlexContainer>
  );
});

const FlexContainer = styled.div`
  height: 100%;
  width: 100%;
  border: solid 1px black;
  display: flex;
  flex-direction: column;
`;

const FlexItem = styled.div`
  min-height: 0;
  flex-grow: 1;
  & + & {
    border-top: solid 1px black;
  }
`;
