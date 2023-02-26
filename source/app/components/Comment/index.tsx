import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import type { FC, MouseEvent } from 'react';

type Props = {
  name: string;
  email: string;
  body: string;
};

const Comment: FC<Props> = ({ name, email, body }) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<AccountCircleIcon color="primary" />}
        action={
          <>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>{t('edit')}</MenuItem>
              <MenuItem onClick={handleClose}>{t('delete')}</MenuItem>
            </Menu>
          </>
        }
        title={name}
        subheader={email}
      />
      <CardContent>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
