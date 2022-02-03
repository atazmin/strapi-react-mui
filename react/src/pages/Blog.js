import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Image from 'mui-image';
import {
  Container,
  Typography,
  Link,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Grid,
} from '@mui/material';
import { BLOG_POSTS } from 'queries/collection-types';
import { Loading, Error, NotFound, NoContent } from 'components/status/Status';
import Head from 'components/_base/head/Head';
import PageHeading from 'components/page-heading/PageHeading.js';
import { DateTime } from 'luxon';

export default function Blog() {
  const { loading, error, data } = useQuery(BLOG_POSTS);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const { blogPosts: posts } = data;

  const seo = {
    title: 'Blog',
    description: 'Blog',
    slug: 'blog',
  };

  if (posts === null) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      <Head props={seo} />
      <Container sx={{ py: 10 }}>
        <PageHeading props="Blog" />
        {posts.length ? (
          <Grid
            container
            alignItems="stretch"
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {posts.map((post) => (
              <Grid
                key={post.id}
                item
                xs={12}
                md={6}
                sx={{
                  border: '0px solid red',
                  display: 'flex',
                }}
              >
                <Card
                  sx={{
                    border: '0px solid green',
                    flexGrow: 1,
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar aria-label="author">
                        {post.created_by.firstname.charAt(0) +
                          post.created_by.lastname.charAt(0)}
                      </Avatar>
                    }
                    title={
                      post.created_by.firstname + ' ' + post.created_by.lastname
                    }
                    subheader={DateTime.now(post.published_at).toFormat(
                      'MMMM dd, yyyy'
                    )}
                  />
                  {post.featuredImage && (
                    <Image
                      key={post.featuredImage.id}
                      src={
                        process.env.REACT_APP_IMAGES_ENDPOINT +
                        post.featuredImage.url
                      }
                      alt={post.featuredImage.alternativeText}
                      title={post.featuredImage.caption}
                      showLoading
                      duration={500}
                      fit="contain"
                      loading="lazy"
                      sx={{
                        borderRadius: '10px 0 10px 0',
                      }}
                      wrapperStyle={{ height: 'auto' }}
                      className="__Image"
                    />
                  )}

                  <CardContent sx={{ p: { xs: 4 } }}>
                    <Typography
                      component="h3"
                      variant="h6"
                      sx={{ mb: 2 }}
                      gutterBottom
                    >
                      {post.Title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: { xs: 3 } }}>
                      {post.Content.substring(0, 200).replace(/[^\w\s]/gi, '')}
                      ...
                    </Typography>
                    <CardActions sx={{ p: 0 }}>
                      <Link
                        to={`/blog/${post.slug}`}
                        component={RouterLink}
                        variant="button"
                        size="large"
                      >
                        Read More
                      </Link>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoContent />
        )}
      </Container>
    </React.Fragment>
  );
}
