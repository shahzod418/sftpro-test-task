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

type Paths = Path.Main | Path.Posts | Path.Albums | Path.Todos;

const navigationPaths: Paths[] = [Path.Main, Path.Posts, Path.Albums, Path.Todos];

const mappedPaths: Record<Paths, { color: FabTypeMap['props']['color']; icon: ReactElement }> = {
  [Path.Main]: {
    color: 'default',
    icon: <Home />,
  },
  [Path.Posts]: {
    color: 'info',
    icon: <Newspaper />,
  },
  [Path.Albums]: {
    color: 'success',
    icon: <PhotoAlbum />,
  },
  [Path.Todos]: {
    color: 'secondary',
    icon: <DashboardCustomize />,
  },
};

const Navigation: FC<Props> = ({ mount, handleNavigate }) => {
  const pathname = location.pathname;

  return (
    <Slide direction="up" in={mount}>
      <Grid container gap={2} justifyContent="flex-end" marginTop="auto" paddingY={4}>
        {navigationPaths.map(path => {
          if (`/${path}` === pathname) {
            return null;
          }

          const { color, icon } = mappedPaths[path];

          return (
            <Fab key={path} color={color} onClick={handleNavigate(path)}>
              {icon}
            </Fab>
          );
        })}
      </Grid>
    </Slide>
  );
};

export default memo(Navigation);
