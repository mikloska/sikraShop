import React, {useState} from 'react'
import {Menu, MenuItem} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const ShopMenu = ({shopAnchorEl, handleShopMenuClose, isShopMenuOpen, linkClass}) =>{

  return (
    <Menu title='Collection' anchorEl={shopAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} id='collectionnMenu'
    keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={isShopMenuOpen} onClose={handleShopMenuClose}
    >
      <MenuItem onClick={handleShopMenuClose} className={linkClass} component={RouterLink} to='/necklaces'>Necklaces & Pendants</MenuItem>
      <MenuItem onClick={handleShopMenuClose} className={linkClass} component={RouterLink} to='/earrings'>Earrings</MenuItem>
      <MenuItem onClick={handleShopMenuClose} className={linkClass} component={RouterLink} to='/rings'>Rings</MenuItem>
      <MenuItem onClick={handleShopMenuClose} className={linkClass} component={RouterLink} to='/bracelets'>Bracelets</MenuItem>
    </Menu>

  )
}

export default ShopMenu