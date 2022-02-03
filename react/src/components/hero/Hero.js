import React from 'react';
import Image from 'mui-image';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Container, Box, Typography, Link } from '@mui/material';
import 'components/hero/hero.scss';

export default function Hero(props) {
  const { Heading, Description, Button, Image: imageAttributes } = props.props;
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
  const { id, url, alternativeText, caption } = isMobile
    ? imageAttributes.smallSize
    : imageAttributes.largeSize;

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ position: 'relative' }}
      className="hero"
    >
      <Image
        key={id}
        src={process.env.REACT_APP_IMAGES_ENDPOINT + url}
        alt={alternativeText}
        title={caption}
        showLoading
        duration={500}
        className="hero__image"
      />
      <Box
        component="div"
        sx={{
          position: { md: 'absolute' },
          maxWidth: 'sm',
          top: '50%',
          transform: { md: 'translateY(-50%)' },
          left: '10%',
          p: 2,
          backgroundColor: 'white',
          textAlign: 'left',
        }}
        className="content"
      >
        <Typography
          component="h3"
          variant="h3"
          gutterBottom
          className="content__heading"
        >
          {Heading}
        </Typography>
        <Typography
          paragraph
          variant="h6"
          gutterBottom
          className="content__description"
        >
          {Description}
        </Typography>
        <Link
          variant="button"
          href={Button.Link}
          target="_blank"
          sx={{
            display: 'inline-block',
            p: 2,
            fontSize: 16,
            color: 'white',
            backgroundColor: (theme) => theme.palette.primary.main,
          }}
          className="content__link"
        >
          {Button.Text}
        </Link>
      </Box>
    </Container>
  );
}
