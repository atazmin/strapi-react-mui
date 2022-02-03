import React from 'react';
import { BLOG_POST_CATEGORY } from 'queries/collection-types.js';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Loading, Error, NotFound } from 'components/status/Status';
import { Typography } from '@mui/material';

export default function Category() {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(BLOG_POST_CATEGORY, {
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

  const { categoryBySlug: category } = data;

  if (category === null) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h1">
        {category.name}
      </Typography>
      {category.blog_posts.map((post) => (
        <section key={post.id}>
          <Typography component="h3" variant="h3">
            {post.Title}
          </Typography>
          <Typography component="p" variant="body1">
            {post.Content.substring(0, 200)}...
          </Typography>
          <RouterLink to={`/blog/${post.slug}`}>Read More</RouterLink>
        </section>
      ))}
    </React.Fragment>
  );
}
