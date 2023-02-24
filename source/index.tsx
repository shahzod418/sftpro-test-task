import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App';

const main = (): void => {
  const rootNode = document.getElementById('root');

  if (!rootNode) {
    return;
  }

  const root = createRoot(rootNode);

  root.render(<App />);
};

main();
