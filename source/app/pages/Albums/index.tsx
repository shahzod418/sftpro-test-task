import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Fade, Grid } from '@mui/material';

import CustomCard from '@components/CustomCard';
import Header from '@components/Header';
import Navigation from '@components/Navigation';
import { getAlbumByIdPath } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useMount } from '@hooks/useMount';
import { fetchAlbums, removeAlbum } from '@state/thunks/album';

import styles from './style.m.scss';

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
      <Grid container paddingX={24} paddingTop={4}>
        <Header mount={mount} header={t('albums')} create edit onEdit={handleEdit} />
        {albums.ids.length !== 0 && (
          <Fade in={mount}>
            <Grid container spacing={2} justifyContent="center" className={styles.container}>
              {albums.ids.map(id => (
                <CustomCard
                  key={id}
                  title={albums.entities[id]?.title || ''}
                  isEdit={isEdit}
                  onClick={handleClick(id)}
                  asyncThunk={removeAlbum(id)}
                />
              ))}
            </Grid>
          </Fade>
        )}
      </Grid>
      <Navigation mount={mount} handleNavigate={handleNavigate} />
    </>
  );
};

export default Albums;
