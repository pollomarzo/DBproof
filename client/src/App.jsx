import React from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
  colors,
} from '@material-ui/core';

import Main from './Main';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: colors.amber,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
};

export default App;
