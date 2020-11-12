import * as React from 'react';
import {
  MainWrapper,
  GridContainer,
  ToolContainer,
  ToolBar,
  Padding8px,
  ResizeContainer,
  ContentWrapper,
  MasterVolKnob,
  Notes,
  NoteInput
} from './components';

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
                <MasterVolKnob />
                <NoteInput />
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
