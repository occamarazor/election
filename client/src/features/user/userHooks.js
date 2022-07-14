import MetaMaskOnboarding from '@metamask/onboarding';
import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NOTIFICATION_TYPES } from '../../components/common/commonConstants';
import { notificationsAdd } from '../notifications/notificationsSlice';
import { selectUserData } from './userSelectors';
import { userRequestAccount, userReset } from './userSlice';

export const useUserOnboarding = () => {
  const dispatch = useDispatch();
  const onboarding = useRef(null);
  const { account: userAccount } = useSelector(selectUserData);

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
          dispatch(userRequestAccount());
        } else {
          dispatch(userReset());
          dispatch(
            notificationsAdd({
              message: 'User account: disconnected',
              variant: NOTIFICATION_TYPES.WARNING,
            }),
          );
        }
      };

      dispatch(userRequestAccount());
      window.ethereum.on('accountsChanged', handleUserAccountChange);
      // TODO: track chain change
      return () => {
        window.ethereum.removeListener('accountsChanged', handleUserAccountChange);
      };
    }
  }, [dispatch]);

  return useCallback(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      dispatch(userRequestAccount());
    } else {
      onboarding.current.startOnboarding();
    }
  }, [dispatch]);
};
