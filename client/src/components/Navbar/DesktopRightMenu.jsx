import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import {Menu, MenuItem, IconButton} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountMenu from './AccountMenu'
import AdminMenu from './AdminMenu'

const DesktopRightMenu = ({desktopClass, MyBadge, itemCount, handleProfileMenuOpen, anchorEl,setAnchorEl, menuId, isMenuOpen, handleMobileMenuClose, 
  handleMenuClose, handleSignOut, userInformation, handleAdminMenuOpen, handleAdminMenuClose, adminAnchorEl, isAdminMenuOpen, linkClass}) =>{
  return(
    <div className={desktopClass}>
      <IconButton aria-label="cart" aria-controls="cart" aria-haspopup="true" color="inherit" className={linkClass} component={RouterLink} to='/basket'>
        <MyBadge badgeContent={itemCount} color='primary'>
          <ShoppingBasketIcon style={{color:"black"}}/>
        </MyBadge>
      </IconButton>
      
        <AccountMenu handleProfileMenuOpen={handleProfileMenuOpen} anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuId={menuId} isMenuOpen={isMenuOpen} 
        handleMenuClose={handleMenuClose} handleSignOut={handleSignOut} userInformation={userInformation} linkClass={linkClass}/>
    
      {userInformation && userInformation.isAdmin && (
        <AdminMenu handleMenuClose={handleMenuClose}/>
      )}
    </div>
  )
}

export default DesktopRightMenu