import React from 'react';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { Container, Stack } from '@mui/material';
import { HOME_PAGE } from 'queries/single-type.js';
import Carousel from 'components/carousel/Carousel';
import Cards from 'components/card/Card';
import Head from 'components/_base/head/Head';
import { Loading, Error, NotFound } from 'components/status/Status';

export default function Home() {
  const { loading, error, data } = useQuery(HOME_PAGE);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const { homepage } = data;

  if (homepage === null) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      {homepage.Seo && <Head props={homepage.Seo} slug={'/'} />}
      <Carousel props={homepage.homepageCarousel} />
      <Container sx={{ py: 10 }}>
        {homepage.Cards && <Cards props={homepage.Cards} />}
        <Stack sx={{ py: 10 }}>
          <ReactMarkdown>{homepage.content}</ReactMarkdown>
        </Stack>
      </Container>
    </React.Fragment>
  );
}
