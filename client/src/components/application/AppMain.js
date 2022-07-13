import Box from '@mui/material/Box';
import ElectionPage from '../election/ElectionPage';
import NotificationsNotifier from '../notifications/NotificationsNotifier';
import NotificationsTest from '../notifications/NotificationsTest';

// TODO: test, useNotificationsNotifier
const AppMain = () => (
  <Box component='main' pt={8}>
    <NotificationsNotifier />
    <NotificationsTest />
    <ElectionPage />
  </Box>
);

export default AppMain;
