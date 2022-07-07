import Typography from '@mui/material/Typography';

const ElectionError = ({ title, error }) => (
  <Typography variant='h3' gutterBottom color='textSecondary' textAlign='center'>
    {title}: {error}
  </Typography>
);

export default ElectionError;
