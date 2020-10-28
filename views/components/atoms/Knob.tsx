import * as React from 'react';
import styled from 'styled-components';

type propsType = {
  percentage: number;
}

export const Knob: React.FC<propsType> = ({ percentage }) => {
  const angle = 2.7 * percentage;
  return (
    <Container>
      <Meter angle={angle} percentage={percentage} />
      <Blanc />
      <InnerCircle>
        <Mark angle={angle} />
      </InnerCircle>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #767676;
`;

const Meter = styled.div<{angle: number, percentage: number}>`
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: #85D1EC;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #333;
  }

  &::before {
    left: -50%;
    z-index: 2;
    transform-origin: right 50%;
    transform: rotate(${({angle}) => 45 + angle}deg);
  }

  &::after {
    left: 50%;
    z-index: 3;
    transform-origin: left 50%;
    transform: rotate(${({percentage}) => percentage <= 50 ? 0 : 180}deg);
    ${({percentage}) => percentage <= 50 ? null : "background-color: #0F0;"}
  }
`;

const Blanc = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  height: 50%;
  width: 50%;
  background-color: inherit;
  transform-origin: right bottom;
  transform: rotate(-135deg);
`;

const InnerCircle = styled.div`
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  height: 80%;
  width: 80%;
  border-radius: 50%;
  background-color: inherit;
  transform: translate(-50%, -50%);
`;

const Mark = styled.div<{angle: number}>`
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform: rotate(${({angle}) => -45 + angle}deg);

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    height: 3px;
    width: 50%;
    background-color: #333;
    transform: translateY(-50%);
  }
`;
