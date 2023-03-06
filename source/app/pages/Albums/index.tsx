import { LoadingStatus } from '@interfaces/state/loadingStatus';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Container, Fade, Grid } from '@mui/material';

import CustomCard from '@components/CustomCard';
import CustomSkeleton from '@components/CustomSkeleton';
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
  const { mount, handleNavigate } = useMount();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const albums = useAppSelector(state => state.albums);

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
    <Container sx={{ pt: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header edit header={t('albums')} mount={mount} onEdit={handleEdit} />
      <Fade in={mount}>
        <Grid
          container
          className={styles['album-section']}
          justifyContent="center"
          mt={2}
          spacing={2}
        >
          {albums.loadingStatus !== LoadingStatus.Idle || !albums ? (
            <CustomSkeleton />
          ) : (
            albums.ids.map(id => (
              <CustomCard
                key={id}
                asyncThunk={removeAlbum(id)}
                isEdit={isEdit}
                title={albums.entities[id]?.title || ''}
                onClick={handleClick(id)}
              />
            ))
          )}
        </Grid>
      </Fade>
      <Navigation handleNavigate={handleNavigate} mount={mount} />
    </Container>
  );
};

export default Albums;
