import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PrimaryNavigationAccordion from 'components/navigation/header-navigation-accordion/HeaderNavigationAccordion';
import {
  Drawer,
  List,
  Divider,
  MenuItem,
  Link,
  IconButton,
} from '@mui/material';
import 'components/navigation/header-navigation-drawer/header-navigation-drawer.scss';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PrimaryNavigationDrawer(props) {
  const { props: menuItems } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{
          ...(open && { display: 'none' }),
          marginRight: 0,
          marginLeft: 'auto',
          // position: 'absolute',
          // right: 0,
          // transform: 'translateX(-100%)',
          border: '0px solid red',
        }}
        className="_IconButton"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
          position: 'absolute',
          width: 0,
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((menuItem) => {
            if (menuItem.__typename === 'ComponentNavigationLink') {
              return (
                <MenuItem key={menuItem.id}>
                  <Link
                    to={menuItem.url}
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                    aria-current="page"
                    onClick={handleDrawerClose}
                  >
                    {menuItem.label}
                  </Link>
                </MenuItem>
              );
            } else {
              return (
                <PrimaryNavigationAccordion
                  props={menuItem}
                  handleDrawerClose={handleDrawerClose}
                  key={menuItem.id}
                />
              );
            }
          })}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
