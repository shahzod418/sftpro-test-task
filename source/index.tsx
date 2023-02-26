import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

import './i18n';

import './styles/index.scss';
import './styles/loader.scss';

const App = lazy(() => import('./app'));

const main = (): void => {
  const rootNode = document.getElementById('root');

  if (!rootNode) {
    return;
  }

  const root = createRoot(rootNode);

  root.render(
    <Suspense fallback={<div className="loading"></div>}>
      <App />
    </Suspense>,
  );
};

main();
