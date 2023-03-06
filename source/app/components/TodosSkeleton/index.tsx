import React from 'react';

import { Skeleton } from '@mui/material';

import type { FC } from 'react';

const TodosSkeleton: FC = () => (
  <>
    <Skeleton sx={{ minHeight: 95, mb: '20px' }} variant="rounded" />
    <Skeleton sx={{ minHeight: 95, mb: '20px' }} variant="rounded" />
    <Skeleton sx={{ minHeight: 95, mb: '20px' }} variant="rounded" />
    <Skeleton sx={{ minHeight: 95, mb: '20px' }} variant="rounded" />
    <Skeleton sx={{ minHeight: 95, mb: '20px' }} variant="rounded" />
  </>
);

export default TodosSkeleton;
