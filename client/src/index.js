import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import store from './store'
import { ThemeProvider } from "@material-ui/core";
import App from './App'

import { createTheme } from '@material-ui/core/styles';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Signika',
      // 'cursive',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#067e78',
    },

    // secondary: {
    //   main: green[500],
    // },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <Provider store = {store}>
    <App/>
  </Provider>
  </ThemeProvider>,
document.getElementById('root'));