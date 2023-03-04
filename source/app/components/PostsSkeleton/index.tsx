import React from 'react';

import { Grid, Skeleton } from '@mui/material';

import styles from './style.m.scss';

import type { FC } from 'react';

const PostsSkeleton: FC = () => {
  return (
    <>
      <Grid item xs={10} lg={5} xl={3}>
        <Skeleton variant="rounded" className={styles.skeleton} />
      </Grid>
      <Grid item xs={10} lg={5} xl={3}>
        <Skeleton variant="rounded" className={styles.skeleton} />
      </Grid>
      <Grid item xs={10} lg={5} xl={3}>
        <Skeleton variant="rounded" className={styles.skeleton} />
      </Grid>
      <Grid item xs={10} lg={5} xl={3}>
        <Skeleton variant="rounded" className={styles.skeleton} />
      </Grid>
      <Grid item xs={10} lg={5} xl={3}>
        <Skeleton variant="rounded" className={styles.skeleton} />
      </Grid>
      <Grid item xs={10} lg={5} xl={3}>
        <Skeleton variant="rounded" className={styles.skeleton} />
      </Grid>
    </>
  );
};

export default PostsSkeleton;
