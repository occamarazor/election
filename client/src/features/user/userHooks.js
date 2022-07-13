import MetaMaskOnboarding from '@metamask/onboarding';
import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NOTIFICATION_TYPES } from '../../components/common/commonConstants';
import { notificationsAdd } from '../notifications/notificationsSlice';
import { selectUser } from './userSelectors';
import { userRequestAccount, userRequestAccountSuccess } from './userSlice';

export const useUserOnboarding = () => {
  const dispatch = useDispatch();
  const onboarding = useRef(null);
  const { data: userAccount } = useSelector(selectUser);

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && userAccount) {
      onboarding.current.stopOnboarding();
    }
  }, [userAccount]);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const handleUserAccountChange = (userAccounts) => {
        const account = userAccounts[0];
        if (account) {
          if (userAccount) {
            dispatch(userRequestAccountSuccess(account));
            dispatch(
              notificationsAdd({
                message: `User account: switched to '${account}'`,
                variant: NOTIFICATION_TYPES.SUCCESS,
              }),
            );
          }
        } else {
          dispatch(userRequestAccountSuccess(''));
          dispatch(
            notificationsAdd({
              message: 'User account: disconnected',
              variant: NOTIFICATION_TYPES.WARNING,
            }),
          );
        }
      };

      window.ethereum.on('accountsChanged', handleUserAccountChange);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleUserAccountChange);
      };
    }
  }, [dispatch, userAccount]);

  return useCallback(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      dispatch(userRequestAccount());
    } else {
      onboarding.current.startOnboarding();
    }
  }, [dispatch]);
};
