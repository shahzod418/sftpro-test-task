import React from 'react';

import { Grid, Skeleton } from '@mui/material';

import type { FC } from 'react';

const CustomSkeleton: FC = () => (
  <>
    <Grid item lg={5} xs={10}>
      <Skeleton sx={{ minHeight: 150 }} variant="rounded" />
    </Grid>
    <Grid item lg={5} xs={10}>
      <Skeleton sx={{ minHeight: 150 }} variant="rounded" />
    </Grid>
    <Grid item lg={5} xs={10}>
      <Skeleton sx={{ minHeight: 150 }} variant="rounded" />
    </Grid>
    <Grid item lg={5} xs={10}>
      <Skeleton sx={{ minHeight: 150 }} variant="rounded" />
    </Grid>
    <Grid item lg={5} xs={10}>
      <Skeleton sx={{ minHeight: 150 }} variant="rounded" />
    </Grid>
    <Grid item lg={5} xs={10}>
      <Skeleton sx={{ minHeight: 150 }} variant="rounded" />
    </Grid>
  </>
);

export default CustomSkeleton;
