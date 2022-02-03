import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { Container, Typography, Divider } from '@mui/material';
import { Loading, Error, NotFound } from 'components/status/Status';
import { ARTICLE } from 'queries/collection-types';
import Head from 'components/_base/head/Head';

export default function BlogPost() {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(ARTICLE, {
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

  const { articleBySlug: article } = data;

  if (article === null) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      {article.Seo && <Head props={article.Seo} slug={article.slug} />}
      <Container sx={{ py: 10 }}>
        <Typography component="h1" variant="h2" sx={{ mb: 4 }}>
          <Divider textAlign="center">{article.Title}</Divider>
        </Typography>
        <ReactMarkdown>{article.Content}</ReactMarkdown>
        <hr />
      </Container>
    </React.Fragment>
  );
}
