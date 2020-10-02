import * as React from 'react';
import { Container } from './Container';
import { ToolItems } from './ToolItems';

export const ToolBar: React.FC = () => {
  return (
    <Container>
      <ToolItems.Play />
    </Container>
  );
};
