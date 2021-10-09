import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
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
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
