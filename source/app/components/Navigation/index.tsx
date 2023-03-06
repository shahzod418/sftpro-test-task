import React, { memo } from 'react';

import { DashboardCustomize, Home, Newspaper, PhotoAlbum } from '@mui/icons-material';
import { Fab, Grid, Slide } from '@mui/material';

import { Path } from '@constants/routes';

import type { FabTypeMap } from '@mui/material';
import type { FC, ReactElement } from 'react';

type Props = {
  mount: boolean;
  handleNavigate: (path: Path) => () => void;
};

type Data = {
  path: Path;
  color: FabTypeMap['props']['color'];
  icon: ReactElement;
};

const data: Data[] = [
  {
    path: Path.Main,
    color: 'default',
    icon: <Home />,
  },
  {
    path: Path.Posts,
    color: 'info',
    icon: <Newspaper />,
  },
  {
    path: Path.Albums,
    color: 'success',
    icon: <PhotoAlbum />,
  },
  {
    path: Path.Todos,
    color: 'secondary',
    icon: <DashboardCustomize />,
  },
];

const Navigation: FC<Props> = ({ mount, handleNavigate }) => (
  <Slide direction="up" in={mount}>
    <Grid container gap={2} justifyContent="flex-end" mt="auto" py={4}>
      {data.map(({ path, color, icon }) =>
        `/${path}` === location.pathname ? null : (
          <Fab key={path} color={color} onClick={handleNavigate(path)}>
            {icon}
          </Fab>
        ),
      )}
    </Grid>
  </Slide>
);

export default memo(Navigation);
