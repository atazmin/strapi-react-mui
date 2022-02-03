import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Container,
  Stack,
  Paper,
  Typography,
  Link,
  styled,
} from '@mui/material';
import { ARTICLES } from 'queries/collection-types';
import { Loading, Error, NotFound, NoContent } from 'components/status/Status';
import Head from 'components/_base/head/Head';
import PageHeading from 'components/page-heading/PageHeading.js';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Articles() {
  const { loading, error, data } = useQuery(ARTICLES);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const { articles } = data;

  const seo = {
    title: 'Articles',
    description: 'Articles',
    slug: 'articles',
  };

  if (articles === null) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      <Head props={seo} />
      <Container sx={{ py: 10 }}>
        <PageHeading props="Articles" />
        {articles.length ? (
          <Stack spacing={2}>
            {articles.map((article) => (
              <Item key={article.id}>
                <Typography component="h3" variant="h3">
                  {article.Title}
                </Typography>
                <Typography component="p" variant="body1">
                  {article.Content.substring(0, 200).replace(/[^\w\s]/gi, '')}
                  ...
                </Typography>
                <Link
                  to={`/articles/${article.slug}`}
                  component={RouterLink}
                  variant="button"
                  color="secondary"
                >
                  Read More
                </Link>
              </Item>
            ))}
          </Stack>
        ) : (
          <NoContent />
        )}
      </Container>
    </React.Fragment>
  );
}
