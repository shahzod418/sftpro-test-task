import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardHeader, IconButton, Menu, MenuItem } from '@mui/material';

import { useAppDispatch } from '@hooks/redux';
import { removeComment } from '@state/thunks/comment';

import type { FC, MouseEvent } from 'react';

type Props = {
  commentId: number;
  name: string;
  email: string;
};

const CommentHeader: FC<Props> = ({ commentId, name, email }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleDelete = (): void => {
    dispatch(removeComment(commentId));
    setAnchorEl(null);
  };

  return (
    <CardHeader
      avatar={<AccountCircleIcon color="primary" />}
      action={
        <>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleDelete}>{t('delete')}</MenuItem>
          </Menu>
        </>
      }
      title={name}
      subheader={email}
    />
  );
};

export default CommentHeader;
