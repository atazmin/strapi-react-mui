import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Button, Menu, MenuItem, Fade, Link } from '@mui/material';
import 'components/navigation/header-navigation-dropdown/header-navigation-dropdown.scss';

export default function PrimaryNavigationDropdown(props) {
  const { links: menuItems, dropdownName } = props.dropdownProps;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        component="li"
        id="dropdown-button"
        aria-controls="fade-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
        sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 'normal' }}
      >
        {dropdownName}
        {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {menuItems.map((menuItem) => {
          return (
            <MenuItem key={menuItem.id} onClick={handleClose}>
              <Link
                to={menuItem.url}
                component={RouterLink}
                color="inherit"
                underline="hover"
                aria-current="page"
              >
                {menuItem.label}
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
}
