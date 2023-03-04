import React from 'react';
import { useTranslation } from 'react-i18next';

import ErrorIcon from '@mui/icons-material/Error';
import { Grid, Paper, Typography } from '@mui/material';

import styles from './style.m.scss';

import type { FC } from 'react';

const ErrorPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} justifyContent="center" margin="auto">
      <Paper elevation={0} className={styles.paper}>
        <ErrorIcon className={styles.icon} />
        <Typography variant="h2" color="white">
          {t('error')}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default ErrorPage;
