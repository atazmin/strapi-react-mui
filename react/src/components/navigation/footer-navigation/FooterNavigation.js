import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PRIMARY_NAVIGATION } from 'queries/single-type.js';
import { Loading, Error, NotFound } from 'components/status/Status';
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  MenuList,
  MenuItem,
  Link,
} from '@mui/material';
import 'components/navigation/footer-navigation/footer-navigation.scss';

export default function FooterNavigation() {
  const { loading, error, data } = useQuery(PRIMARY_NAVIGATION);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const menuItems = data.primaryNavigation.primaryNavigationComponents;

  if (menuItems === null) {
    return <NotFound />;
  }

  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
      className="footer-navigation-container"
    >
      <MenuList
        sx={{
          flexGrow: 1,
          display: { xs: 'flex' },
          flexDirection: { xs: 'column', md: 'row' },
        }}
        dense
      >
        {menuItems.map((menuItem) => {
          if (menuItem.__typename === 'ComponentNavigationLink') {
            return (
              <MenuItem
                key={menuItem.id}
                sx={{
                  display: {
                    xs: 'flex',
                    alignItems: 'flex-start',
                    fontSize: '1rem',
                  },
                }}
              >
                <Link
                  to={menuItem.url}
                  component={RouterLink}
                  color="inherit"
                  className="link"
                  sx={{
                    pt: 1,
                    pb: 1,
                  }}
                >
                  {menuItem.label}
                </Link>
              </MenuItem>
            );
          } else {
            return (
              <MenuItem key={menuItem.id} className="foo" sx={{ p: 0 }}>
                <MenuList
                  sx={{
                    display: { xs: 'flex' },
                    flexDirection: { xs: 'column', md: 'row' },
                    flexGrow: 1,
                    pt: 0,
                    pb: 0,
                  }}
                >
                  <MenuItem>{menuItem.dropdownName}</MenuItem>
                  {menuItem.links.map((menuItem) => {
                    return (
                      <MenuItem
                        key={menuItem.id}
                        sx={{
                          ml: 1,
                          minHeight: 'auto',
                          lineHeight: 1,
                        }}
                      >
                        <Link
                          to={menuItem.url}
                          component={RouterLink}
                          color="inherit"
                          sx={{ pt: 1, pb: 1 }}
                        >
                          {menuItem.label}
                        </Link>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </MenuItem>
            );
          }
        })}
      </MenuList>
    </Container>
  );
}
