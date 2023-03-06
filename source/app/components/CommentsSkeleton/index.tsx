import React from 'react';

import { Grid, Skeleton } from '@mui/material';

import type { FC } from 'react';

const CommentsSkeleton: FC = () => (
  <>
    <Grid item xs={11}>
      <Skeleton sx={{ height: 50 }} />
    </Grid>
    <Grid item xs={11}>
      <Skeleton sx={{ height: 50 }} />
    </Grid>
    <Grid item xs={11}>
      <Skeleton sx={{ height: 50 }} />
    </Grid>
    <Grid item xs={11}>
      <Skeleton sx={{ height: 50 }} />
    </Grid>
    <Grid item xs={11}>
      <Skeleton sx={{ height: 50 }} />
    </Grid>
    <Grid item xs={11}>
      <Skeleton sx={{ height: 50 }} />
    </Grid>
  </>
);

export default CommentsSkeleton;
