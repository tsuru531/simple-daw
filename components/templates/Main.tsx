import * as React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedTrack, Types } from '../../redux/audio';
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
  const selector: Types.state = useSelector((state: Types.state) => state);
  const selectedTrackId: string = getSelectedTrack(selector);

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
                {selectedTrackId !== "" && <PianoRoll />}
              </ContentWrapper>
            }
          />
        </Padding8px>
      </GridContainer>
    </MainWrapper>
  );
};
