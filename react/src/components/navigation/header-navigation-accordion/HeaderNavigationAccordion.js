import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { MenuList, MenuItem, Link, Typography, styled } from '@mui/material';
import 'components/navigation/header-navigation-accordion/header-navigation-accordion.scss';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function PrimaryNavigationAccordion({
  props,
  handleDrawerClose,
}) {
  const { links: menuItems, dropdownName, id: componentId } = props;
  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <Accordion onChange={handleChange('panel1')}>
        <AccordionSummary
          aria-controls={`panel1d-content-${componentId}`}
          id={`panel1d-header-${componentId}`}
        >
          <Typography>{dropdownName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MenuList id={`panel1d-content-${componentId}`}>
            {menuItems.map((menuItem) => {
              return (
                <MenuItem key={menuItem.id}>
                  <Link
                    to={menuItem.url}
                    component={RouterLink}
                    color="inherit"
                    underline="hover"
                    onClick={() => handleDrawerClose()}
                  >
                    {menuItem.label}
                  </Link>
                </MenuItem>
              );
            })}
          </MenuList>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
