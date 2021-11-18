import React, {useState} from 'react'
import {Menu, MenuItem, IconButton} from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link as RouterLink } from 'react-router-dom';

const AdminMenu = ({handleMobileMenuClose}) =>{
  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const isAdminMenuOpen = Boolean(adminAnchorEl);
  const handleAdminMenuOpen = (event) => setAdminAnchorEl(event.currentTarget);
  const handleAdminMenuClose = () => setAdminAnchorEl(null);
  return (
    <div>
      <IconButton color="inherit" aria-label="open drawer" onClick={handleAdminMenuOpen}>
        <SupervisorAccountIcon style={{color:"black"}}/>
      </IconButton>
      <Menu title='Admin' anchorEl={adminAnchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        id='adminMenu' keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isAdminMenuOpen} onClose={()=>{handleAdminMenuClose(); handleMobileMenuClose();}}
      >
        <MenuItem component={RouterLink} onClick={handleAdminMenuClose} to='/admin/userlist'>
          Users
        </MenuItem>
        <MenuItem component={RouterLink} onClick={handleAdminMenuClose} to='/admin/productlist'>
          Products
        </MenuItem>
        <MenuItem component={RouterLink} onClick={handleAdminMenuClose} to='/admin/orderlist'>
          Orders
        </MenuItem>
        <MenuItem component={RouterLink} onClick={handleAdminMenuClose} to='/admin/promocode'>
          Promo Codes
        </MenuItem>
      </Menu>     
    </div>
  )
}

export default AdminMenu