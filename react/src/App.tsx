import * as React from 'react';
import { Router } from "./Router";

export const App: React.FC = () => {
  return(
    <React.Fragment>
      <main>
        <Router />
      </main>
    </React.Fragment>
  );
};
