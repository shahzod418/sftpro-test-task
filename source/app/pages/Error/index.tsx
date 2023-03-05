import React from 'react';
import { useTranslation } from 'react-i18next';

import { Error } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';

import styles from './style.m.scss';

import type { FC } from 'react';

const ErrorPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ margin: 'auto' }}>
      <Box className={styles.box}>
        <Error className={styles.icon} />
        <Typography align="center" color="white" variant="h2">
          {t('error')}
        </Typography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
