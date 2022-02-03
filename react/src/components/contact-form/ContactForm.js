import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField, Button, Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import EmailIcon from '@mui/icons-material/Email';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import 'components/contact-form/contact-form.scss';

const style = {
  textField: {
    my: 1,
  },
};
export default function ContactForm() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);

  const [emailStatus, setEmailStatus] = useState('');
  const [emailStatusText, setEmailStatusText] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const resetInputFields = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    setNameError(false);
    setEmailError(false);
    setMessageError(false);

    if (name === '') {
      setNameError(true);
    }
    if (email === '') {
      setEmailError(true);
    }
    if (message === '') {
      setMessageError(true);
    }

    if (name && email && message) {
      resetInputFields();
      setIsEmailSubmitted(false);

      if (!loading) {
        setSuccess(true);
        setLoading(false);
      }

      fetch(`${process.env.REACT_APP_ENDPOINT}/emails`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
      })
        .then((response) => {
          setIsEmailSubmitted(true);

          return response.json().then((data) => {
            setSuccess(true);
            setLoading(false);
            const { success, error } = data;
            setEmailStatus(success ? 'success' : 'error');
            setEmailStatusText(success || error);
            return data;
          });
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
    }
  };
  return (
    <React.Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="contact-form"
      >
        <TextField
          onChange={(event) => setName(event.target.value)}
          value={name}
          sx={{ ...style.textField }}
          label="Name"
          variant="outlined"
          fullWidth
          required
          error={nameError}
        />
        <TextField
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          sx={{ ...style.textField }}
          label="Email"
          variant="outlined"
          fullWidth
          required
          error={emailError}
        />
        <TextField
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          sx={{ ...style.textField }}
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
          error={messageError}
        />
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
              {success ? <MarkEmailReadIcon /> : <EmailIcon />}
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
      </Box>
    </React.Fragment>
  );
}
