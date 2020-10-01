import * as React from 'react';
import { MainWrapper } from './MainWrapper';
import { GridContainer } from './GridContainer';
import { ToolContainer } from './ToolContainer';
import { Padding8px } from './Padding8px';
import { ResizeContainer } from './ResizeContainer';
import { ContentWrapper } from './ContentWrapper';
import { ToolBar } from '../../components/organisms';

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
