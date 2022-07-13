import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectNotifications } from '../../features/notifications/notificationsSelectors';
import {
  notificationsDisplay,
  notificationsRemove,
} from '../../features/notifications/notificationsSlice';

// TODO: logs
const NotificationsNotifier = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { data: notifications } = useSelector(selectNotifications);

  const handleNotificationClose = useCallback(
    (notificationId) => () => {
      console.log('----------------------------------');
      console.log('Notifier onClose:', notificationId);
      closeSnackbar(notificationId);
    },
    [closeSnackbar],
  );

  const closeNotificationAction = useCallback(
    (notificationId) => (
      <IconButton
        aria-label='close'
        color='inherit'
        onClick={handleNotificationClose(notificationId)}
      >
        <DeleteIcon />
      </IconButton>
    ),
    [handleNotificationClose],
  );

  const handleNotificationRemove = useCallback(
    (event, notificationId) => {
      console.log('Notifier onExit:', notificationId);
      dispatch(notificationsRemove(notificationId));
    },
    [dispatch],
  );

  useEffect(() => {
    notifications.forEach(({ id, message, variant, displayed }) => {
      if (!displayed) {
        console.log('NotificationsNotifier enqueue:', { id, message, variant, displayed });

        // TODO: persist
        enqueueSnackbar(message, {
          persist: true,
          key: id,
          variant,
          action: closeNotificationAction,
          onExited: handleNotificationRemove,
        });

        dispatch(notificationsDisplay(id));
      }
    });
  }, [dispatch, notifications, enqueueSnackbar, closeNotificationAction, handleNotificationRemove]);

  return null;
};

export default NotificationsNotifier;
