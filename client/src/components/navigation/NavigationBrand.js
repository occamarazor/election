import Box from '@mui/material/Box';
import BallotIcon from '@mui/icons-material/Ballot';
import Typography from '@mui/material/Typography';

const NavigationBrand = () => (
  <>
    <BallotIcon sx={{ display: 'flex', mr: 1 }} />
    <Box color='inherit' noWrap sx={{ flexGrow: 1 }}>
      <Typography
        variant='h6'
        sx={{
          mr: 2,
          display: 'flex',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Election
      </Typography>
    </Box>
  </>
);

export default NavigationBrand;
