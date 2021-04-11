import styled from 'styled-components';

export const TracksContainer = styled.div`
  overflow: scroll;
  height: 100%;
  width: 100%;
  background-color: #666;

  & li + li {
    border-top: solid 1px rgba(0, 0, 0, .05);
  }
`;
