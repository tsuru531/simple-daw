import * as React from 'react';
import styles from './resizeContainer.module.css';
import { useResize } from '../../../hooks/useResize';

type propsType = {
  topComponent?: React.ReactNode,
  bottomComponent?: React.ReactNode
};

export const ResizeContainer: React.FC<propsType> = React.memo(({ topComponent, bottomComponent }) => {
  const resizeRef = useResize();
  return (
    <div className={styles.container} ref={resizeRef.container}>
      <div className={styles.topContainer} ref={resizeRef.top}>
        {topComponent}
      </div>
      <div className={styles.resizeBar} ref={resizeRef.bar} />
      <div className={styles.bottomContainer} ref={resizeRef.bottom}>
        {bottomComponent}
      </div>
    </div>
  );
});
