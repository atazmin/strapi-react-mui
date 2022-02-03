import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { green, red } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import 'components/newsletter-form/newsletter-form.scss';

const style = {
  textField: {
    mt: 0,
    ml: 0,
  },
};

export default function NewsletterForm() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),

    ...(error && {
      bgcolor: red[500],
      '&:hover': {
        bgcolor: red[700],
      },
    }),
  };

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(false);

  const [emailStatus, setEmailStatus] = useState('');
  const [emailStatusText, setEmailStatusText] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const resetInputFields = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
  };

  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError(false);
    setFirstNameError(false);
    setLastNameError(false);

    if (email === '') {
      setEmailError(true);
    }
    if (firstName === '') {
      setFirstNameError(true);
    }
    if (lastName === '') {
      setLastNameError(true);
    }

    if (email && firstName && lastName) {
      resetInputFields();
      setIsEmailSubmitted(false);

      if (!loading) {
        setSuccess(true);
        setError(true);
        setLoading(false);
      }

      fetch(`${process.env.REACT_APP_ENDPOINT}/subscribe`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, firstName, lastName }),
      })
        .then((response) => {
          setIsEmailSubmitted(true);

          return response.json().then((data) => {
            const { success, error } = data;
            setEmailStatus(success ? 'success' : 'error');
            setEmailStatusText(success || error);

            if (success) {
              console.log('success');
              setSuccess(true);
              setError(false);
              setLoading(false);
            } else {
              console.log('error');
              setSuccess(false);
              setError(true);
              setLoading(false);
            }
            return data;
          });
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
    }
  };
  return (
    <Container
      disableGutters={useMediaQuery(useTheme().breakpoints.up('md'))}
      className="newsletter-form-container"
    >
      <Typography
        component="h3"
        variant="h6"
        align="left"
        textTransform="uppercase"
        sx={{ pt: 1, pb: 1 }}
        className="newsletter-form__heading"
      >
        Subscribe to our Mailing List
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="newsletter-form__heading"
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          pb={{ xs: 4 }}
          spacing={2}
          className="__Stack"
        >
          <TextField
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
            sx={{ ...style.textField }}
            label="First Name"
            variant="outlined"
            required
            error={firstNameError}
          />
          <TextField
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
            sx={{ ...style.textField }}
            label="Last Name"
            variant="outlined"
            required
            error={lastNameError}
          />
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            sx={{ ...style.textField }}
            label="Email"
            variant="outlined"
            required
            error={emailError}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ m: 0, position: 'relative' }}>
              <Button
                sx={buttonSx}
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                disabled={loading}
                className="_Button"
              >
                Submit
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Fab aria-label="save" color="primary" sx={buttonSx}>
                {success ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
              </Fab>
              {loading && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
            </Box>
          </Box>
          {isEmailSubmitted && (
            <Typography
              sx={{
                textAlign: 'left',
                color:
                  emailStatus === 'success'
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
            >
              {emailStatusText}
            </Typography>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
