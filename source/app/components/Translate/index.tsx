import React from 'react';
import { useTranslation } from 'react-i18next';

import TranslateIcon from '@mui/icons-material/Translate';
import { Slide } from '@mui/material';

import styles from './style.m.scss';

import type { FC } from 'react';

const Translate: FC<{ mount: boolean }> = ({ mount }) => {
  const { i18n } = useTranslation();

  const handleClick = async (): Promise<void> => {
    await i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  return (
    <Slide direction="down" in={mount}>
      <TranslateIcon className={styles.icon} onClick={handleClick} />
    </Slide>
  );
};

export default Translate;
