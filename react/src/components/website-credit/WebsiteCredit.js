import { Typography } from '@mui/material';
import 'components/website-credit/website-credit.scss';

export default function WebsiteCredit() {
  return (
    <Typography
      align="center"
      color="text.secondary"
      component="p"
      variant="caption"
    >
      <a href="https://URL.com" rel="noreferrer" target="_blank">
        Website by name
      </a>
    </Typography>
  );
}
