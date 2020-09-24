import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { MainContainer } from './MainContainer';
import { ResizeBar } from './ResizeBar';
import { TopContainer } from './TopContainer';
import { BottomContainer } from './BottomContainer';

type propsType = {
  topComponent?: React.ReactNode,
  bottomComponent?: React.ReactNode
};

export const ResizeContainer: React.FC<propsType> = ({ topComponent, bottomComponent }) => {
  const [topContainerHeight, setTopContainerHeight] = useState(0),
        [bottomContainerHeight, setBottomContainerHeight] = useState(0),
        [resizeBarTop, setResizeBarTop] = useState(null);

  const container = useRef<HTMLDivElement>(null),
        resizeBar = useRef<HTMLDivElement>(null);

  const getTopContainerHeight = (): number => {
          const containerTop = container.current.getBoundingClientRect().top,
                resizeBarTop = resizeBar.current.getBoundingClientRect().top;
          const containerHeight = resizeBarTop - containerTop;
          return containerHeight;
        },
        getBottomContainerHaight = (): number => {
          const containerBottom = container.current.getBoundingClientRect().bottom,
                resizeBarBottom = resizeBar.current.getBoundingClientRect().bottom;
          const containerHeight = containerBottom - resizeBarBottom;
          return containerHeight;
        };

  const setContainerHeight = (): void => {
    const top: number = getTopContainerHeight(),
          bottom: number = getBottomContainerHaight();
    setTopContainerHeight(top);
    setBottomContainerHeight(bottom);
  };

  const mouseMove = (e: MouseEvent): void => {
          const containerTop: number = container.current.getBoundingClientRect().top,
                containerBottom: number = container.current.getBoundingClientRect().bottom;
          const top: number = e.clientY - containerTop - 4,
                bottom: number = containerBottom - e.clientY - 4;
          const topIsSmall: boolean = top <= 200,
                bottomIsSmall: boolean = bottom <= 200;
          if (!topIsSmall && !bottomIsSmall) {
            setResizeBarTop(top);
            setContainerHeight();
          };
        },
        mouseUp = (): void => {
          window.removeEventListener('mousemove', mouseMove);
          window.removeEventListener('mouseup', mouseUp);
        };

  useEffect(() => {
    let lastInnerHeight: number = window.innerHeight;
    const windowResize = (): void => {
      const resizedY: boolean = lastInnerHeight !== window.innerHeight;
      if (resizedY) {
        setContainerHeight();
        lastInnerHeight = window.innerHeight;
      };
    };
    window.addEventListener('resize', windowResize);
    setContainerHeight();
    return () => {
      window.removeEventListener('resize', windowResize);
    };
  });

  return (
    <MainContainer ref={container} >
      <TopContainer style={{height: `${topContainerHeight}px`}}>
        {topComponent}
      </TopContainer>
      <ResizeBar
        ref={resizeBar}
        style={{top: `${resizeBarTop}px`}}
        onMouseDown={() => {
          window.addEventListener('mousemove', mouseMove);
          window.addEventListener('mouseup', mouseUp);
        }}
      />
      <BottomContainer style={{height: `${bottomContainerHeight}px`}}>
        {bottomComponent}
      </BottomContainer>
    </MainContainer>
  );
};
