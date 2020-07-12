/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import ThemeProvider from './src/providers/theme';
import Theme from './src/components/Theme';
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <Theme>{element}</Theme>
  </ThemeProvider>
);
