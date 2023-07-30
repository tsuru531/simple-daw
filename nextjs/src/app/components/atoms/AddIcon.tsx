import * as React from 'react';

export const AddIcon: React.FC = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path fill="#333333" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
      </g>
    </svg>
  );
});
