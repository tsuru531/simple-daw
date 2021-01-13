import * as React from 'react';

type propsType = {
  value: Number;
}

export const VolumeMeter: React.FC<propsType> = ({ value }) => {
  return (
    <div>
      {value}
    </div>
  );
};
