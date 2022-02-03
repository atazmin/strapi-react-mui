import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { Container, Typography, Divider } from '@mui/material';
import { PAGE } from 'queries/collection-types';
import { Loading, Error, NotFound } from 'components/status/Status';
import Hero from 'components/hero/Hero';
import Head from 'components/_base/head/Head';

export default function Page() {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(PAGE, {
    variables: {
      slug: slug,
    },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const { pageBySlug: page } = data;

  if (page === null) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      {page.Seo && <Head props={page.Seo} slug={page.slug} />}
      {page.Hero && <Hero props={page.Hero} />}
      <Container
        sx={{
          py: 10,
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{ mb: 10, overflowWrap: 'break-word' }}
        >
          <Divider textAlign="center">{page.Title}</Divider>
        </Typography>
        <Container
          sx={{
            width: { md: '75%' },
            // overflow: 'hidden',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            hyphens: 'auto',
            whiteSpace: 'pre-wrap',
          }}
        >
          <ReactMarkdown>{page.Content}</ReactMarkdown>
        </Container>
      </Container>
    </React.Fragment>
  );
}
