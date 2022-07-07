import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BallotIcon from '@mui/icons-material/Ballot';

const AppHeader = () => (
  <AppBar
    position='fixed'
    color='default'
    elevation={0}
    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
  >
    <Toolbar sx={{ flexWrap: 'wrap' }}>
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
      {/* TODO: wallet connect */}
      <Button href='#' variant='outlined' sx={{ my: 1, mx: 1.5 }}>
        Connect
      </Button>
      <Button href='#' variant='outlined' sx={{ my: 1, mx: 1.5 }}>
        Disconnect
      </Button>
    </Toolbar>
  </AppBar>
);

export default AppHeader;
