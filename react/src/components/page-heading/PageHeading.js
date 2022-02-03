import { Typography, Divider } from '@mui/material';
import 'components/page-heading/page-heading.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function PageTitle({ props: pageHeading }) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

  return (
    <Typography
      component="h1"
      variant="h2"
      sx={{ mb: 10 }}
      className="page-heading"
    >
      <Divider
        sx={{
          whiteSpace: isMobile ? 'normal' : 'pre',
          '::before,::after': {
            width: { xs: '50%' },
          },
        }}
        className="page-heading__divider"
      >
        {pageHeading}
      </Divider>
    </Typography>
  );
}

export default PageTitle;
