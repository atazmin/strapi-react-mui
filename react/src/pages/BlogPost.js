import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { Container, Typography, Divider, Grid } from '@mui/material';
import { BLOG_POST } from 'queries/collection-types';
import { Loading, Error, NotFound } from 'components/status/Status';
import BlogPostCategories from 'components/blog-post-categories/BlogPostCategories';
import Head from 'components/_base/head/Head';
import PageHeading from 'components/page-heading/PageHeading.js';

export default function BlogPost() {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(BLOG_POST, {
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

  const { blogPostBySlug: post } = data;

  if (post === null) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      {post.Seo && <Head props={post.Seo} slug={post.slug} />}
      <Container sx={{ py: 10 }}>
        <PageHeading props={post.Title} />
        <Grid container maxWidth="xs" spacing={{ md: 4 }}>
          <Grid item xs={12} md={8} sx={{ mb: { xs: 4, md: 0 } }}>
            <ReactMarkdown>{post.Content}</ReactMarkdown>
          </Grid>
          <Grid item xs={12} md={4}>
            <BlogPostCategories categories={post.categories} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
