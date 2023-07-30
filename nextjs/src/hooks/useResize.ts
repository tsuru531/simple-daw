import { useRef, useEffect } from 'react';

export const useResize = () => {
  const container = useRef<HTMLDivElement>(null),
        topContent = useRef<HTMLDivElement>(null),
        bottomContent = useRef<HTMLDivElement>(null),
        bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = {
      container: container.current,
      topContent: topContent.current,
      bottomContent: bottomContent.current,
      bar: bar.current
    };
    const getRect = () => {
      return {
        container: node.container.getBoundingClientRect(),
        bar: node.bar.getBoundingClientRect()
      };
    };
    const getContentHeight = {
      top: (): number => {
        const barTop: number = getRect().bar.top,
              containerTop: number = getRect().container.top;
        const contentHeight: number = barTop - containerTop;
        return contentHeight;
      },
      bottom: (): number => {
        const containerBottom: number = getRect().container.bottom,
              barBottom: number = getRect().bar.bottom;
        const contentHeight: number = containerBottom - barBottom;
        return contentHeight;
      }
    };
    const getBarHeight = () => {
      const barHeight: number = node.bar.clientHeight;
      return barHeight;
    };
    const setContentHeight = (): void => {
      const top: number = getContentHeight.top(),
            bottom: number = getContentHeight.bottom();
      node.topContent.style.height = `${top}px`;
      node.bottomContent.style.height = `${bottom}px`;
    };
    const setBarTop = (top): void => {
      node.bar.style.top = `${top}px`;
    };
    const mouseDown = () => {
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
          },
          mouseMove = (e: MouseEvent): void => {
            const mouseY: number = e.clientY,
                  containerTop: number = getRect().container.top,
                  containerBottom: number = getRect().container.bottom,
                  barHeight: number = getBarHeight();
            const clientBarTop: number = mouseY - containerTop - barHeight/2,
                  clientBarBottom: number = containerBottom - mouseY - barHeight/2;
            const topContentIsSmall: boolean = clientBarTop <= 200,
                  bottomContentIsSmall: boolean = clientBarBottom <= 200;
            if (!topContentIsSmall && !bottomContentIsSmall) {
              setBarTop(clientBarTop);
              setContentHeight();
            };
          },
          mouseUp = (): void => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
          };
    let lastInnerHeight: number = window.innerHeight;
    const windowResize = (): void => {
      const resizedY: boolean = lastInnerHeight !== window.innerHeight;
      if (resizedY) {
        setContentHeight();
        lastInnerHeight = window.innerHeight;
      };
    };


    window.addEventListener('resize', windowResize);
    node.bar.addEventListener('mousedown', mouseDown);

    setContentHeight();

    return () => {
      window.removeEventListener('resize', windowResize);
      node.bar.removeEventListener('mousedown', mouseDown);
    };
  });

  return {
    container: container,
    top: topContent,
    bottom: bottomContent,
    bar: bar
  };
};
