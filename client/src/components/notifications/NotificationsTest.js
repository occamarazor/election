import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { notificationsAdd } from '../../features/notifications/notificationsSlice';
import { NOTIFICATION_TYPES } from '../common/commonConstants';

const NotificationsTest = () => {
  const dispatch = useDispatch();

  const handleNotificationAdd = useCallback(
    (notification) => () => {
      dispatch(notificationsAdd(notification));
    },
    [dispatch],
  );

  return (
    <>
      <Button
        color='primary'
        onClick={handleNotificationAdd({
          message: 'Default Message',
          variant: NOTIFICATION_TYPES.DEFAULT,
        })}
      >
        Default notification
      </Button>
      <Button
        color='success'
        onClick={handleNotificationAdd({
          message: 'Success Message',
          variant: NOTIFICATION_TYPES.SUCCESS,
        })}
      >
        Success notification
      </Button>
      <Button
        color='warning'
        onClick={handleNotificationAdd({
          message: 'Warning Message',
          variant: NOTIFICATION_TYPES.WARNING,
        })}
      >
        Warning notification
      </Button>
      <Button
        color='error'
        onClick={handleNotificationAdd({
          message: 'Error Message',
          variant: NOTIFICATION_TYPES.ERROR,
        })}
      >
        Error notification
      </Button>
    </>
  );
};

export default NotificationsTest;
