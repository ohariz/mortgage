import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/react';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        body {
          margin: 0;
          font-family: 'Roboto', sans-serif;
        }
      `}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
