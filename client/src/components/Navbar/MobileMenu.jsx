import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import {Menu, MenuItem, IconButton} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AdminMenu from './AdminMenu'
import AccountMenu from './AccountMenu'

const MobileMenu = ({userInformation, MyBadge, mobileMoreAnchorEl, mobileMenuId, 
    isMobileMenuOpen, handleMobileMenuClose, itemCount, linkClass, handleAdminMenuOpen, handleAdminMenuClose, 
    adminAnchorEl, isAdminMenuOpen, anchorEl, setAnchorEl, menuId, isMenuOpen, handleMenuClose, 
    handleSignOut}) =>{
  return (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId}
      keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}
    >
      {userInformation && userInformation.isAdmin &&
        <MenuItem>
          <AdminMenu handleAdminMenuOpen={handleAdminMenuOpen} 
            handleMobileMenuClose={handleMobileMenuClose} handleAdminMenuClose={handleAdminMenuClose} 
            adminAnchorEl={adminAnchorEl} isAdminMenuOpen={isAdminMenuOpen}
          />
        </MenuItem>
        }
      <MenuItem>
        <IconButton aria-label="cart" aria-controls="cart" aria-haspopup="true" color="inherit"
          className={linkClass} component={RouterLink} to='/basket' onClick={handleMobileMenuClose}
        >
          <MyBadge badgeContent={itemCount} color="primary">
            <ShoppingBasketIcon style={{color:"black"}}/> 
          </MyBadge>
        </IconButton>
      </MenuItem>
      <MenuItem >
        <AccountMenu anchorEl={anchorEl} menuId={menuId} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} 
          handleSignOut={handleSignOut} userInformation={userInformation} setAnchorEl={setAnchorEl} linkClass={linkClass} />
      </MenuItem>
    </Menu>
  )

}

export default MobileMenu