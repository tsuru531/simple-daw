import * as React from 'react';
import { useResize } from '../../../../../../hooks/useResize';
import { Container } from './Container';
import { ResizeBar } from './ResizeBar';
import { TopContainer } from './TopContainer';
import { BottomContainer } from './BottomContainer';

type propsType = {
  topComponent?: React.ReactNode,
  bottomComponent?: React.ReactNode
};

export const ResizeContainer: React.FC<propsType> = React.memo(({ topComponent, bottomComponent }) => {
  const resizeRef = useResize();

  return (
    <Container ref={resizeRef.container}>
      <TopContainer ref={resizeRef.top}>
        {topComponent}
      </TopContainer>
      <ResizeBar ref={resizeRef.bar} />
      <BottomContainer ref={resizeRef.bottom}>
        {bottomComponent}
      </BottomContainer>
    </Container>
  );
});
