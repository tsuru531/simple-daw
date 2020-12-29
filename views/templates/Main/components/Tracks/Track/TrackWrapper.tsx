import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedTrack, setSelectedTrack, Types } from '../../../../../../redux/audio';
import styled from 'styled-components';

type props = {
  trackId: string
};

export const TrackWrapper: React.FC<props> = ({ trackId, children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: Types.state) => state);
  const selectedTrack: string = getSelectedTrack(selector);
  const isSelected: boolean = trackId === selectedTrack;

  return (
    <Wrapper
      onClick={() => dispatch(setSelectedTrack(trackId))}
      isSelected={isSelected}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{isSelected: boolean}>`
  ${({isSelected}) => isSelected?
    "background-color: #AAAAAA;":
    "background-color: #888888;"}
`;
