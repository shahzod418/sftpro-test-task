import React from 'react';
import { useTranslation } from 'react-i18next';

import ErrorIcon from '@mui/icons-material/Error';
import { Grid, Paper, Typography } from '@mui/material';

import styles from './style.m.scss';

import type { FC } from 'react';

const ErrorPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="center" margin="auto" spacing={2}>
      <Paper className={styles.paper} elevation={0}>
        <ErrorIcon className={styles.icon} />
        <Typography color="white" variant="h2">
          {t('error')}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default ErrorPage;
