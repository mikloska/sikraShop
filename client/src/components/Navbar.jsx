import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, InputBase, TextField, Badge} from '@material-ui/core';
import Image from "material-ui-image";
import MenuIcon from '@material-ui/icons/Menu';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  stylebar:{
    background: 'white'
  },
  // Icons:{
  //   background: 'black'
  // },
  logo: {
    height:70,
    marginTop: 10,
    marginRight:20
    // maxWidth: 60,

    // marginRight: "80px",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },

  search: {
    
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100VW',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Navbar= () => {
  const classes = useStyles();
  const [mainNavanchorEl, setMainNavAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleNavMenuOpen = (event) =>{
    setMainNavAnchorEl(event.currentTarget);
  }

  const handleNavMenuClose = () =>{
    setMainNavAnchorEl(null);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/signin' onClick={handleMenuClose}>Sign In</MenuItem>
      <MenuItem style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/account' onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>

      </MenuItem>
      <MenuItem>
      <IconButton
        aria-label="cart"
        aria-controls="cart"
        aria-haspopup="true"
        color="inherit"
        style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/basket'
        onClick={handleMobileMenuClose}
      >
        {/* style={{transform: 'translate(74%, -69%)'}} */}
      <Badge badgeContent={4} color="primary">
        <ShoppingBasketIcon style={{color:"black"}}/>
      </Badge>
      </IconButton>

      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>

        <IconButton 
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          
          <AccountCircle style={{color:"black"}}/>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.stylebar}>
        <Toolbar>
          
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleNavMenuOpen}
          >
          
            <MenuIcon style={{color:"black"}}/>
          </IconButton>
          <Menu justify = "center" anchorEl={mainNavanchorEl} keepMounted open={Boolean(mainNavanchorEl)} onClose={handleNavMenuClose}>
            <MenuItem onClick={handleNavMenuClose} style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/necklaces'>Necklaces & Pendants</MenuItem>
            <MenuItem onClick={handleNavMenuClose} style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/earrings'>Earrings</MenuItem>
            <MenuItem onClick={handleNavMenuClose} style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/rings'>Rings</MenuItem>
            <MenuItem onClick={handleNavMenuClose} style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/bracelets'>Bracelets</MenuItem>
            <MenuItem onClick={handleNavMenuClose} style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/about'>About Us</MenuItem>
          </Menu>
          
          {/* <Image alt="Example Alt" src="https://sikra.s3.us-east-2.amazonaws.com/logo-%2Bhigh%2Bres4.png" /> */}
          {/* <Typography style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/' className={classes.title} variant="h6" noWrap>
            Sikra Jewelry
          </Typography> */}

          <Typography variant="h6" className={classes.title} component={RouterLink} to='/'>
            <img
              src={'./images/logo.png'}
              alt="logo"
              className={classes.logo}
            />
          </Typography>
          <div className={classes.search}>
            {/* <div className={classes.searchIcon}>
              <SearchIcon style={{color:"black"}}/>
            </div> */}
            <TextField
              size="small"
              className={classes.SearchBox}
              variant="outlined"
              style={{color:"black"}}
              border={2}
              placeholder="Search…."
              // classes={{
              //   root: classes.inputRoot,
              //   input: classes.inputInput,
              // }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

              <IconButton
                aria-label="cart"
                aria-controls="cart"
                aria-haspopup="true"
                color="inherit"
                style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/basket'
                
                >
            <Badge badgeContent={4} color="primary">
              <ShoppingBasketIcon style={{color:"black"}}/>
            </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >

              <AccountCircle style={{color:"black"}}/>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{color:"black"}}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}


export default Navbar;