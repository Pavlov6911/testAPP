import React, { ReactNode } from 'react';
import { NextUIProvider as Provider } from '@nextui-org/react';

interface NextUIProviderProps {
  children: ReactNode;
}

const NextUIProvider: React.FC<NextUIProviderProps> = ({ children }) => {
  return (
    <Provider>
      {children}
    </Provider>
  );
};

export default NextUIProvider;