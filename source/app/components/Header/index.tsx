import React from 'react';
import { useTranslation } from 'react-i18next';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Fab, Grid, Slide, Typography } from '@mui/material';

import type { FC } from 'react';

type Props = {
  mount: boolean;
  header: string;
  create?: boolean;
  onCreate?: () => void;
  edit?: boolean;
  onEdit?: () => void;
};

const Header: FC<Props> = ({ mount, header, create, onCreate, edit, onEdit }) => {
  const { t } = useTranslation();

  return (
    <Slide in={mount} direction="down">
      <Grid container alignItems="center" marginBottom={2}>
        <Grid item marginRight="auto">
          <Typography variant="h3" color="white">
            {header}
          </Typography>
        </Grid>
        {create && (
          <Grid item sx={{ mr: 2 }}>
            <Fab variant="extended" color="info" onClick={onCreate}>
              <AddIcon sx={{ mr: 2 }} />
              {t('create')}
            </Fab>
          </Grid>
        )}
        {edit && (
          <Grid item>
            <Fab variant="extended" color="warning" onClick={onEdit}>
              <EditIcon sx={{ mr: 2 }} />
              {t('edit')}
            </Fab>
          </Grid>
        )}
      </Grid>
    </Slide>
  );
};

export default Header;
