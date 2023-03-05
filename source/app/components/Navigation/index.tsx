import React, { memo } from 'react';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import { Fab, Grid, Slide } from '@mui/material';

import { Path } from '@constants/routes';

import type { FabTypeMap } from '@mui/material';
import type { FC, ReactElement } from 'react';

type Props = {
  mount: boolean;
  handleNavigate: (path: Path) => () => void;
};

type Paths = Path.Main | Path.Posts | Path.Albums | Path.ToDos;

const navigationPaths: Paths[] = [Path.Main, Path.Posts, Path.Albums, Path.ToDos];

const mappedPaths: Record<Paths, { color: FabTypeMap['props']['color']; icon: ReactElement }> = {
  [Path.Main]: {
    color: 'default',
    icon: <HomeIcon />,
  },
  [Path.Posts]: {
    color: 'info',
    icon: <NewspaperIcon />,
  },
  [Path.Albums]: {
    color: 'success',
    icon: <PhotoAlbumIcon />,
  },
  [Path.ToDos]: {
    color: 'secondary',
    icon: <DashboardCustomizeIcon />,
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
