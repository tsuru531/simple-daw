import * as React from 'react';
import { useSelector } from 'react-redux';
import { getMasterLevel } from '../../../redux/audio/selectors';
import { VolumeMeter } from '../../components/atoms';
import { ToolBar } from '../../components/organisms';
import { MainWrapper } from './MainWrapper';
import { GridContainer } from './GridContainer';
import { ToolContainer } from './ToolContainer';
import { Padding8px } from './Padding8px';
import { ResizeContainer } from './ResizeContainer';
import { ContentWrapper } from './ContentWrapper';
import { MasterVolKnob } from './MasterVolKnob';

export const Main: React.FC = () => {
  const selecter = useSelector(state => state);
  const masterLevel = getMasterLevel(selecter);


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
                <VolumeMeter value={ masterLevel } />
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
