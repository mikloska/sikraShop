import React, {useState} from 'react'
import {Menu, MenuItem, IconButton} from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link as RouterLink } from 'react-router-dom';

const AdminMenu = ({handleMenuClose, menuId}) =>{
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
        id='adminMenu' keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} aria-controls={menuId} aria-haspopup="true" 
        open={isAdminMenuOpen} //onClose={handleMenuClose}
      >
        <MenuItem component={RouterLink} onClick={()=>{handleAdminMenuClose();handleMenuClose();}} to='/admin/userlist'>
          Users
        </MenuItem>
        <MenuItem component={RouterLink} onClick={()=>{handleAdminMenuClose();handleMenuClose();}} to='/admin/productlist'>
          Products
        </MenuItem>
        <MenuItem component={RouterLink} onClick={()=>{handleAdminMenuClose();handleMenuClose();}} to='/admin/orderlist'>
          Orders
        </MenuItem>
        <MenuItem component={RouterLink} onClick={()=>{handleAdminMenuClose();handleMenuClose();}} to='/admin/promocode'>
          Promo Codes
        </MenuItem>
      </Menu>     
    </div>
  )
}

export default AdminMenu