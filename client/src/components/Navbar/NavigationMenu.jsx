import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import {Menu, MenuItem, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const NavigationMenu = ({menuButtonClass, handleNavMenuOpen, handleNavMenuClose, mainNavAnchorEl, handleShopMenuOpen, linkClass}) =>{
  return (
    <div>
      <IconButton edge="start" className={menuButtonClass} color="inherit" aria-label="open drawer" onClick={handleNavMenuOpen}>
        <MenuIcon style={{color:"black"}}/>
      </IconButton>
      <Menu justify = "center" anchorEl={mainNavAnchorEl} keepMounted open={Boolean(mainNavAnchorEl)} onClose={handleNavMenuClose}>
        <MenuItem onClick={handleShopMenuOpen}>Shop</MenuItem>
        <MenuItem onClick={handleNavMenuClose} className={linkClass} component={RouterLink} to='/about'>About Us</MenuItem>
        <MenuItem onClick={handleNavMenuClose} className={linkClass} component={RouterLink} to='/custom'>Custom Work</MenuItem>
        <MenuItem onClick={handleNavMenuClose} className={linkClass} component={RouterLink} to='/contact'>Contact Us</MenuItem>
      </Menu>      
    </div>
  )
}

export default NavigationMenu