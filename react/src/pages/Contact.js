import React from 'react';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { Container, Grid, Typography, Divider } from '@mui/material';
import { CONTACT_PAGE } from 'queries/single-type.js';
import { Loading, Error, NotFound } from 'components/status/Status';
import ContactForm from 'components/contact-form/ContactForm';
import Head from 'components/_base/head/Head';

export default function Contact() {
  const { loading, error, data } = useQuery(CONTACT_PAGE);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const { contact } = data;

  if (contact === null) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      {contact.Seo && <Head props={contact.Seo} slug={contact.slug} />}
      <Container sx={{ py: 10 }}>
        <Typography component="h1" variant="h2">
          <Divider textAlign="center">{contact.name}</Divider>
        </Typography>
        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ py: 10 }}>
          <Grid item md={6}>
            <ContactForm />
          </Grid>
          <Grid item md={6}>
            <ReactMarkdown>{contact.content}</ReactMarkdown>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
