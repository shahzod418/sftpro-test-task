import React from 'react';

import { Grid, Skeleton } from '@mui/material';

import styles from './style.m.scss';

import type { FC } from 'react';

const CustomSkeleton: FC = () => {
  return (
    <>
      <Grid item lg={5} xl={3} xs={10}>
        <Skeleton className={styles.skeleton} variant="rounded" />
      </Grid>
      <Grid item lg={5} xl={3} xs={10}>
        <Skeleton className={styles.skeleton} variant="rounded" />
      </Grid>
      <Grid item lg={5} xl={3} xs={10}>
        <Skeleton className={styles.skeleton} variant="rounded" />
      </Grid>
      <Grid item lg={5} xl={3} xs={10}>
        <Skeleton className={styles.skeleton} variant="rounded" />
      </Grid>
      <Grid item lg={5} xl={3} xs={10}>
        <Skeleton className={styles.skeleton} variant="rounded" />
      </Grid>
      <Grid item lg={5} xl={3} xs={10}>
        <Skeleton className={styles.skeleton} variant="rounded" />
      </Grid>
    </>
  );
};

export default CustomSkeleton;
