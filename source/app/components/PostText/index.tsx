import React, { memo } from 'react';

import { Grid, Skeleton, Typography } from '@mui/material';

import type { FC } from 'react';

type Props = {
  header: string;
  text?: string;
};

const PostText: FC<Props> = ({ header, text }) => (
  <>
    <Grid item lg={3} xs={11}>
      <Typography color="white" variant="h4">
        {header}
      </Typography>
    </Grid>
    <Grid item lg={8} xs={11}>
      <Typography color="white" variant="h6">
        {text ? text : <Skeleton />}
      </Typography>
    </Grid>
  </>
);

export default memo(PostText);
