import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import NavigationBrand from '../navigation/NavigationBrand';
import NavigationMenu from '../navigation/NavigationMenu';

const AppHeader = () => (
  <AppBar
    position='fixed'
    color='default'
    elevation={0}
    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
  >
    <Toolbar sx={{ flexWrap: 'wrap' }}>
      <NavigationBrand />
      <NavigationMenu />
    </Toolbar>
  </AppBar>
);

export default AppHeader;
