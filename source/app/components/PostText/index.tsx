import React, { memo } from 'react';

import { Grid, Skeleton, Typography } from '@mui/material';

import type { FC } from 'react';

type Props = {
  header: string;
  text?: string;
};

const PostText: FC<Props> = ({ header, text }) => {
  return (
    <>
      <Grid item xs={11} lg={3}>
        <Typography variant="h4" color="white">
          {header}
        </Typography>
      </Grid>
      <Grid item xs={11} lg={8}>
        <Typography variant="h6" color="white">
          {text ? text : <Skeleton />}
        </Typography>
      </Grid>
    </>
  );
};

export default memo(PostText);
