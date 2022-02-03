import React from 'react';
import FooterNavigation from 'components/navigation/footer-navigation/FooterNavigation';
import NewsLetterForm from 'components/newsletter-form/NewsletterForm';
import WebsiteCredit from 'components/website-credit/WebsiteCredit';
import { Box, Container, Typography } from '@mui/material';
import 'components/_base/footer/footer.scss';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'grey.300', py: 6 }}
      className="footer"
    >
      <Container disableGutters className="footer-container">
        <NewsLetterForm />
        <FooterNavigation />
        <Typography component="p" variant="body2" align="center" pt={2} pb={1}>
          &copy; {new Date().getFullYear()} Logo
        </Typography>
        <WebsiteCredit />
      </Container>
    </Box>
  );
}
