import React, {useState} from 'react'
import { Link as RouterLink } from 'react-router-dom';
import {Menu, MenuItem, IconButton} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const AccountMenu = ({anchorEl, setAnchorEl, menuId, isMenuOpen, handleMenuClose, handleSignOut, userInformation, linkClass}) =>{
  const handleAccountMenuOpen = (event) => setAnchorEl(event.currentTarget);
  return (
    <div>
      <IconButton onClick={handleAccountMenuOpen} aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" color="inherit">
        <AccountCircle style={{color:"black"}}/>
      </IconButton>
      <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId} keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMenuOpen} onClose={handleMenuClose}
      >
        {userInformation?(
          [<MenuItem className={linkClass} key={1} component={RouterLink} to='/account' onClick={handleMenuClose}>My account</MenuItem>,
          <MenuItem className={linkClass} key={2} component={RouterLink} to='/' onClick={handleSignOut}>Sign Out</MenuItem>]): 
          <MenuItem className={linkClass} component={RouterLink} to='/login' onClick={handleMenuClose}  style={{zIndex:10}}>Sign In</MenuItem>
        }
      </Menu>
    </div>
  )
}

export default AccountMenu