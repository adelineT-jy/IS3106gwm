import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, StyleReset } from 'atomize';

import App from './App';

import './index.css';

const theme = {
  colors: {
    primary: 'tomato',
    accent: 'yellow',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyleReset />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
