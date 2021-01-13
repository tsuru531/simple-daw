import * as React from 'react';
import {
  MainWrapper,
  GridContainer,
  ContentWrapper,
  ToolContainer,
  Padding8px
} from '../atoms';
import { ResizeContainer, MasterVolKnob } from '../molecules';
import { ToolBar, Tracks, PianoRoll } from '../organisms';

export const Main: React.FC = () => {
  return (
    <MainWrapper>
      <GridContainer>
        <ToolContainer>
          <ToolBar />
        </ToolContainer>
        <Padding8px>
          <ResizeContainer
            topComponent={
              <ContentWrapper>
                <Tracks />
                <MasterVolKnob />
              </ContentWrapper>
            }
            bottomComponent={
              <ContentWrapper>
                <PianoRoll />
              </ContentWrapper>
            }
          />
        </Padding8px>
      </GridContainer>
    </MainWrapper>
  );
};
