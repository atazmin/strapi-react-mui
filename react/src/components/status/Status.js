import React from 'react';
import { Stack, Typography, CircularProgress } from '@mui/material';
import 'components/status/status.scss';

const style = {
  textAlign: 'center',
  fontWeight: '500',
  p: { xs: 8, md: 12 },
  fontSize: { xs: 18, md: 22 },
};

const Loading = () => {
  return (
    <Stack alignItems="center">
      <CircularProgress sx={{ m: 1 }} color="primary" />
      <Typography
        sx={{
          ...style,
          color: 'primary.main',
        }}
      >
        Data is loading...
      </Typography>
    </Stack>
  );
};

const Error = () => {
  return (
    <Typography
      sx={{
        ...style,
        color: 'error.main',
      }}
    >
      Error loading data!
    </Typography>
  );
};

const NotFound = () => {
  return (
    <Typography
      sx={{
        ...style,
        color: 'warning.main',
      }}
    >
      Page not Found!
    </Typography>
  );
};

const NoContent = () => {
  return (
    <Typography
      sx={{
        ...style,
        color: 'primary.main',
      }}
    >
      No content has been added yet. Please check back soon.
    </Typography>
  );
};

export { Loading, Error, NotFound, NoContent };
