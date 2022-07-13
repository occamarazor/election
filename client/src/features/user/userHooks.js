import MetaMaskOnboarding from '@metamask/onboarding';
import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
        dispatch(userRequestAccountSuccess(userAccounts[0]));
      };

      window.ethereum.on('accountsChanged', handleUserAccountChange);
      dispatch(userRequestAccount());

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
