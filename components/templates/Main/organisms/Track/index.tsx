import * as React from 'react';
import styled from 'styled-components';
import { TrackContainer } from './TrackContainer';
import { TypeInput } from './TypeInput';
import { TrackVolKnob } from './TrackVolKnob';
import { DeleteTrackButton } from './DeleteTrackButton';

type props = {
  trackId: string
};

export const Track: React.FC<props> = React.memo(({ trackId }) => {
  return (
    <TrackContainer trackId={trackId}>
      <FlexContainer>
        <LeftContainer>
          <TypeInput trackId={trackId} />
          <TrackVolKnob trackId={trackId} />
        </LeftContainer>
        <div>
          <DeleteTrackButton trackId={trackId} />
        </div>
      </FlexContainer>
    </TrackContainer>
  );
});

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
`;

const LeftContainer = styled.div`
  display: flex;
  background-color: inherit;
`;
