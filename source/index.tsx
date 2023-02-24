import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { store } from '@state/store';

const App = lazy(() => import('./app/App'));

import './styles/index.scss';
import './styles/loader.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const main = (): void => {
  const rootNode = document.getElementById('root');

  if (!rootNode) {
    return;
  }

  const root = createRoot(rootNode);

  root.render(
    <Suspense fallback={<div className="loading"></div>}>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </Suspense>,
  );
};

main();
