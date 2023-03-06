import React from 'react';
import { useTranslation } from 'react-i18next';

import { Add, Edit } from '@mui/icons-material';
import { Fab, Grid, Slide, Typography } from '@mui/material';

import { useDeviceDetect } from '@hooks/useDeviceDetect';

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
  const { isMobile } = useDeviceDetect();
  const { t } = useTranslation();

  return (
    <Slide direction="down" in={mount}>
      <Grid container alignItems="center">
        <Grid item mr="auto">
          <Typography color="white" variant="h3">
            {header}
          </Typography>
        </Grid>
        {create && (
          <Grid item mr={2}>
            <Fab color="info" variant="extended" onClick={onCreate}>
              <Add sx={{ mr: isMobile ? 0 : 2 }} />
              {isMobile ? '' : t('create')}
            </Fab>
          </Grid>
        )}
        {edit && (
          <Grid item>
            <Fab color="warning" variant="extended" onClick={onEdit}>
              <Edit sx={{ mr: isMobile ? 0 : 2 }} />
              {isMobile ? '' : t('edit')}
            </Fab>
          </Grid>
        )}
      </Grid>
    </Slide>
  );
};

export default Header;
