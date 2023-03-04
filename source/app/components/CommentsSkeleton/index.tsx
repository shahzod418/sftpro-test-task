import React from 'react';

import { Grid, Skeleton } from '@mui/material';

import styles from './style.m.scss';

import type { FC } from 'react';

const CommentsSkeleton: FC = () => {
  return (
    <>
      <Grid item xs={11} className={styles.box}>
        <Skeleton className={styles.skeleton} />
      </Grid>
      <Grid item xs={11} className={styles.box}>
        <Skeleton className={styles.skeleton} />
      </Grid>
      <Grid item xs={11} className={styles.box}>
        <Skeleton className={styles.skeleton} />
      </Grid>
      <Grid item xs={11} className={styles.box}>
        <Skeleton className={styles.skeleton} />
      </Grid>
      <Grid item xs={11} className={styles.box}>
        <Skeleton className={styles.skeleton} />
      </Grid>
      <Grid item xs={11} className={styles.box}>
        <Skeleton className={styles.skeleton} />
      </Grid>
    </>
  );
};

export default CommentsSkeleton;
