import { LoadingStatus } from '@interfaces/state/loadingStatus';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Backdrop, CircularProgress, Container, Fade, Grid } from '@mui/material';

import Header from '@components/Header';
import Navigation from '@components/Navigation';
import PhotoSlider from '@components/PhotoSlider';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useMount } from '@hooks/useMount';
import { fetchAlbumById } from '@state/thunks/album';
import { fetchPhotosByAlbumId } from '@state/thunks/photo';

import type { Photo } from '@interfaces/state/photo';
import type { FC } from 'react';

const Album: FC = () => {
  const { mount, handleNavigate } = useMount();

  const { t } = useTranslation();
  const params = useParams<{ albumId: string }>();
  const dispatch = useAppDispatch();

  const albumId = Number(params.albumId);

  const photos = useAppSelector(state => state.photos);
  const album = useAppSelector(state => state.albums.entities[albumId] || null);
  const photosByAlbumIds = useAppSelector(
    state => state.photosByAlbumIds.entities[albumId] || null,
  );

  useEffect(() => {
    dispatch(fetchPhotosByAlbumId(albumId));

    if (!album) {
      dispatch(fetchAlbumById(albumId));
    }
  }, []);

  return (
    <Container sx={{ pt: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header header={t('album')} mount={mount} />
      <Fade in={mount}>
        <Grid container>
          {photos.loadingStatus !== LoadingStatus.Idle || !photosByAlbumIds ? (
            <Backdrop open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <PhotoSlider
              photos={photosByAlbumIds.reduce<Photo[]>((acc, photoId) => {
                const photo = photos.entities[photoId];

                if (!photo) {
                  return acc;
                }

                return [...acc, photo];
              }, [])}
            />
          )}
        </Grid>
      </Fade>
      <Navigation handleNavigate={handleNavigate} mount={mount} />
    </Container>
  );
};

export default Album;
