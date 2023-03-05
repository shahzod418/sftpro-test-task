import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Fade, Grid } from '@mui/material';

import CustomCard from '@components/CustomCard';
import Header from '@components/Header';
import Navigation from '@components/Navigation';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useMount } from '@hooks/useMount';
import { fetchAlbums, removeAlbum } from '@state/thunks/album';

import styles from './style.m.scss';

import { getAlbumByIdPath } from '@constants/routes';

import type { EntityId } from '@reduxjs/toolkit';
import type { FC } from 'react';

const Albums: FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const albums = useAppSelector(state => state.albums);

  const dispatch = useAppDispatch();

  const { mount, handleNavigate } = useMount();

  const handleClick = (albumId: EntityId) => (): void => {
    navigate(getAlbumByIdPath(albumId));
  };

  const handleEdit = (): void => {
    setIsEdit(previousState => !previousState);
  };

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);

  return (
    <>
      <Grid container paddingTop={4} paddingX={24}>
        <Header create edit header={t('albums')} mount={mount} onEdit={handleEdit} />
        {albums.ids.length !== 0 && (
          <Fade in={mount}>
            <Grid container className={styles.container} justifyContent="center" spacing={2}>
              {albums.ids.map(id => (
                <CustomCard
                  key={id}
                  asyncThunk={removeAlbum(id)}
                  isEdit={isEdit}
                  title={albums.entities[id]?.title || ''}
                  onClick={handleClick(id)}
                />
              ))}
            </Grid>
          </Fade>
        )}
      </Grid>
      <Navigation handleNavigate={handleNavigate} mount={mount} />
    </>
  );
};

export default Albums;
