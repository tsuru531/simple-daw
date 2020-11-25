import * as React from 'react';
import {
  MainWrapper,
  GridContainer,
  ToolContainer,
  ToolBar,
  Padding8px,
  ResizeContainer,
  ContentWrapper,
  Tracks,
  MasterVolKnob,
} from './components';
import { Notes } from './Notes';

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
                <Notes />
              </ContentWrapper>
            }
          />
        </Padding8px>
      </GridContainer>
    </MainWrapper>
  );
};
