import React from 'react';
import { useTranslation } from 'react-i18next';

import { Error } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';

import type { FC } from 'react';

const ErrorPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ m: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Error sx={{ fontSize: '15em', color: 'white' }} />
        <Typography align="center" color="white" variant="h2">
          {t('error')}
        </Typography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
