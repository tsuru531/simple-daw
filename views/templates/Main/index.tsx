import * as React from 'react';
import {
  MainWrapper,
  GridContainer,
  ToolContainer,
  ToolBar,
  Padding8px,
  ResizeContainer,
  Tracks,
  MasterVolKnob,
} from './components';
import { ContentWrapper } from './ContentWrapper';
import { BottomContent } from './BottomContent';

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
            bottomComponent={<BottomContent />}
          />
        </Padding8px>
      </GridContainer>
    </MainWrapper>
  );
};
