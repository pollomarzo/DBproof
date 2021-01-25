import React from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
  colors,
} from '@material-ui/core';

import Main from './Main';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: colors.amber,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <CssBaseline />
        <Main />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
