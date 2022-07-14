import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import MetaMaskOnboarding from '@metamask/onboarding';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { selectUserData } from '../../features/user/userSelectors';
import { useUserOnboarding } from '../../features/user/userHooks';

const NavigationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { account: userAccount } = useSelector(selectUserData);
  const handleUserAccountConnect = useUserOnboarding();

  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return userAccount ? (
    <>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenuOpen}
        color='inherit'
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>Account: {userAccount}</MenuItem>
      </Menu>
    </>
  ) : (
    <Button href='#' variant='outlined' sx={{ my: 1, mx: 1.5 }} onClick={handleUserAccountConnect}>
      {MetaMaskOnboarding.isMetaMaskInstalled() ? 'connect' : 'install'}
    </Button>
  );
};

export default NavigationMenu;
