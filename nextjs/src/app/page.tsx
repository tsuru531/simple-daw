import styles from './page.module.css';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedTrack, Types } from '../../../redux/audio';
import { ResizeContainer } from './components/molecules/ResizeContainer';
import { MainContainer, ContentContainer } from '../../app/atoms';
import { ToolBar, Tracks, PianoRoll } from './organisms';

export default function Home() {
  const selector: Types.state = useSelector((state: Types.state) => state);
  const selectedTrackId: string = getSelectedTrack(selector);

  return (
    <main>
      <MainContainer>
        <div className={styles.gridContainer}>
          <div className={styles.toolContainer}>
            <ToolBar />
          </div>
          <div className={styles.padding8}>
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
          </div>
        </div>
      </MainContainer>
    </main>
  )
}
