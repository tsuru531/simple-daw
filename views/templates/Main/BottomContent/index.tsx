import * as React from 'react';
import { ContentWrapper } from '../ContentWrapper';
import { Notes } from '../Notes';

export const BottomContent: React.FC = () => {
  return (
    <ContentWrapper>
      <Notes />
    </ContentWrapper>
  );
};
