import * as React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedTrack, Types } from '../../../redux/audio';
import {
  GridContainer,
  ToolContainer,
  Padding8px,
  ResizeContainer
} from './atoms';
import { MainContainer, ContentContainer } from '../../app/atoms';
import { ToolBar, Tracks, PianoRoll } from './organisms';

export const Main: React.FC = () => {
  const selector: Types.state = useSelector((state: Types.state) => state);
  const selectedTrackId: string = getSelectedTrack(selector);

  return (
    <MainContainer>
      <GridContainer>
        <ToolContainer>
          <ToolBar />
        </ToolContainer>
        <Padding8px>
          <ResizeContainer
            topComponent={
              <ContentContainer>
                <Tracks />
              </ContentContainer>
            }
            bottomComponent={
              <ContentContainer>
                {selectedTrackId !== "" && <PianoRoll />}
              </ContentContainer>
            }
          />
        </Padding8px>
      </GridContainer>
    </MainContainer>
  );
};
