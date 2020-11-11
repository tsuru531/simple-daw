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
  Notes
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
                <Notes />
              </ContentWrapper>
            }
            bottomComponent={
              <ContentWrapper>
              </ContentWrapper>
            }
          />
        </Padding8px>
      </GridContainer>
    </MainWrapper>
  );
};
