import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PRIMARY_NAVIGATION } from 'queries/single-type.js';
import { useQuery } from '@apollo/client';
import PrimaryNavigationDropdown from 'components/navigation/header-navigation-dropdown/HeaderNavigationDropdown';
import PrimaryNavigationDrawer from 'components/navigation/header-navigation-drawer/HeaderNavigationDrawer';
import { Loading, Error, NotFound } from 'components/status/Status';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  Container,
  AppBar,
  Box,
  Typography,
  Toolbar,
  MenuItem,
  Link,
  useScrollTrigger,
  Fab,
  Zoom,
} from '@mui/material';
import 'components/navigation/header-navigation/header-navigation.scss';

function HeaderScroll(props) {
  const { children } = props;
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    sx: trigger
      ? {
          bgcolor: theme.palette.primary.dark,
          transitionDuration: '500ms',
          transitionProperty: 'padding-top, padding-bottom, background-color',
          transitionTimingFunction: 'ease-in-out',
        }
      : {
          pt: 2,
          pb: 2,
          bgcolor: theme.palette.primary.main,
        },
    elevation: trigger ? 5 : 0,
  });
}

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 10 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

export default function PrimaryNavigation(props) {
  const { loading, error, data } = useQuery(PRIMARY_NAVIGATION);
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

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
    <React.Fragment>
      <HeaderScroll {...props}>
        <AppBar position="sticky" className="header">
          <Container className="header__container">
            <Toolbar
              disableGutters
              sx={{ border: '0px solid red' }}
              className="header__toolbar"
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  flexGrow: 0,
                  display: 'flex',
                  border: '0px solid red',
                }}
                className="header__logo"
              >
                <MenuItem>
                  <Link
                    to="/"
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                  >
                    Logo
                  </Link>
                </MenuItem>
              </Typography>
              {isMobile ? (
                <PrimaryNavigationDrawer props={menuItems} />
              ) : (
                <Box
                  component="ul"
                  sx={{
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                    display: { xs: 'flex' },
                  }}
                  className="navigation"
                >
                  {menuItems.map((menuItem) => {
                    if (menuItem.__typename === 'ComponentNavigationLink') {
                      return (
                        <MenuItem
                          key={menuItem.id}
                          sx={{ p: 0 }}
                          className="navigation__item"
                        >
                          <Link
                            to={menuItem.url}
                            component={RouterLink}
                            color="inherit"
                            underline="none"
                            aria-current="page"
                            sx={{ px: 2, py: 2 }}
                            className="navigation__link"
                          >
                            {menuItem.label}
                          </Link>
                        </MenuItem>
                      );
                    } else {
                      return (
                        <PrimaryNavigationDropdown
                          key={menuItem.id}
                          dropdownProps={menuItem}
                        />
                      );
                    }
                  })}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HeaderScroll>
      <Toolbar
        id="back-to-top-anchor"
        className="_Toolbar"
        sx={{
          minHeight: '0 !important',
        }}
      />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
