import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, Container, MobileStepper, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useDeviceDetect } from '@hooks/useDeviceDetect';

import type { Photo } from '@interfaces/state/photo';
import type { FC } from 'react';

type Props = {
  photos: Photo[];
};

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const PhotoSlider: FC<Props> = ({ photos }) => {
  const { isMobile } = useDeviceDetect();

  const [activeStep, setActiveStep] = useState<number>(0);

  const theme = useTheme();

  const maxSteps = photos.length;

  const handleNext = (): void => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = (step: number): void => {
    setActiveStep(step);
  };

  return (
    <Container>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: isMobile ? 150 : 50,
          pl: 2,
          my: 2,
        }}
      >
        <Typography align="center" sx={{ mx: 'auto' }} variant="h5">
          {photos[activeStep].title}
        </Typography>
      </Paper>
      <Box sx={{ width: isMobile ? 300 : 500, flexGrow: 1, mx: 'auto' }}>
        <AutoPlaySwipeableViews
          enableMouseEvents
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
        >
          {photos.map((photo, step) => (
            <div key={photo.id}>
              {Math.abs(activeStep - step) <= 2 ? (
                <Box
                  alt={photo.title}
                  component="img"
                  loading="lazy"
                  src={photo.url}
                  sx={{
                    height: isMobile ? 300 : 500,
                    display: 'block',
                    overflow: 'hidden',
                    width: isMobile ? 300 : 500,
                  }}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          activeStep={activeStep}
          position="static"
          steps={maxSteps}
          variant="progress"
          backButton={
            <Button disabled={activeStep === 0} size="small" onClick={handleBack}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              {isMobile ? '' : 'Back'}
            </Button>
          }
          nextButton={
            <Button disabled={activeStep === maxSteps - 1} size="small" onClick={handleNext}>
              {isMobile ? '' : 'Next'}
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
        />
      </Box>
    </Container>
  );
};

export default PhotoSlider;
