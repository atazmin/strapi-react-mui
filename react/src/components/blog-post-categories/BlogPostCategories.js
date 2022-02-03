import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, ListSubheader, Link } from '@mui/material';

export default function BlogPostCategories(props) {
  const { categories } = props;

  return (
    <List>
      <ListSubheader>Categories</ListSubheader>
      {categories.map((category) => {
        return (
          <ListItem key={category.id}>
            <Link to={`/category/${category.slug}`} component={RouterLink}>
              {category.name}
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
}
