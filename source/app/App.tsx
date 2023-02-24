import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Container } from '@mui/material';

import type { FC } from 'react';

const App: FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Button variant="contained">{t('hello')}</Button>
    </Container>
  );
};

export default App;
