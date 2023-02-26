import React from 'react';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import { Fab, Grid, Slide } from '@mui/material';

import type { FC } from 'react';

type Props = {
  mount: boolean;
  handleNavigate: (path: string) => () => void;
};

const Navigation: FC<Props> = ({ mount, handleNavigate }) => {
  return (
    <Slide in={mount} direction="up">
      <Grid container paddingTop={8} paddingRight={24} justifyContent="flex-end" gap={2}>
        <Fab onClick={handleNavigate('')}>
          <HomeIcon />
        </Fab>
        <Fab onClick={handleNavigate('posts')} color="info">
          <NewspaperIcon />
        </Fab>
        <Fab onClick={handleNavigate('albums')} color="success">
          <PhotoAlbumIcon />
        </Fab>
        <Fab onClick={handleNavigate('todos')} color="secondary">
          <DashboardCustomizeIcon />
        </Fab>
      </Grid>
    </Slide>
  );
};

export default Navigation;
