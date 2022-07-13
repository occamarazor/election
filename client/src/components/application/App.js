import { useNotifications } from '../../features/notifications/notificationsHooks';
import AppHeader from './AppHeader';
import AppMain from './AppMain';

const App = () => {
  useNotifications();

  return (
    <>
      <AppHeader />
      <AppMain />
    </>
  );
};

export default App;
