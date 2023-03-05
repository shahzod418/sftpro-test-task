import React from 'react';

import { Skeleton } from '@mui/material';

import styles from './style.m.scss';

import type { FC } from 'react';

const TodosSkeleton: FC = () => {
  return (
    <>
      <Skeleton className={styles.skeleton} variant="rounded" />
      <Skeleton className={styles.skeleton} variant="rounded" />
      <Skeleton className={styles.skeleton} variant="rounded" />
      <Skeleton className={styles.skeleton} variant="rounded" />
      <Skeleton className={styles.skeleton} variant="rounded" />
      <Skeleton className={styles.skeleton} variant="rounded" />
      <Skeleton className={styles.skeleton} variant="rounded" />
    </>
  );
};

export default TodosSkeleton;
