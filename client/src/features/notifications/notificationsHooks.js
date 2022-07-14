import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectNotifications } from './notificationsSelectors';
import { notificationsDisplay, notificationsRemove } from './notificationsSlice';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { data: notifications } = useSelector(selectNotifications);

  const handleNotificationClose = useCallback(
    (notificationId) => () => {
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
      dispatch(notificationsRemove(notificationId));
    },
    [dispatch],
  );

  useEffect(() => {
    notifications.forEach(({ id, message, variant, displayed }) => {
      if (!displayed) {
        enqueueSnackbar(message, {
          key: id,
          variant,
          action: closeNotificationAction,
          onExited: handleNotificationRemove,
        });

        dispatch(notificationsDisplay(id));
      }
    });
  }, [dispatch, notifications, enqueueSnackbar, closeNotificationAction, handleNotificationRemove]);
};
