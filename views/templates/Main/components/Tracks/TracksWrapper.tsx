import styled from 'styled-components';

export const TracksWrapper = styled.div`
  overflow: scroll;
  height: 300px;
  width: 100%;
  background-color: #767676;

  & li + li {
    border-top: solid 2px #777777;
  }
`;
