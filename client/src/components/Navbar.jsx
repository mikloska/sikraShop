import React, {useEffect} from 'react';
import { Route } from 'react-router-dom'
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Button, TextField, Badge} from '@material-ui/core';
import Image from "material-ui-image";
import MenuIcon from '@material-ui/icons/Menu';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { changeBadge } from '../actions/itemCountActions'
import {signOut} from '../actions/userActions'
import SearchBox from './SearchBox'

const MyBadge = withStyles((theme) => ({
  badge: {
    left: 7,
    top: -4,
    // backgroundColor:'#067e78'
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  Badge : {

  },
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
  Link: {
    color: 'inherit', 
    textDecoration: 'inherit'

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
  const userLogin=useSelector(state=>state.userLogin)
  const {userInformation}=userLogin
  const classes = useStyles();
  const itemCount = useSelector(state => state.itemCount)
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket)
  const { basketItems } = basket
  
  //Access counter of items in cart in Redux store to use with bade
  useEffect(() => {
    dispatch(changeBadge(basketItems.reduce((acc, item) => acc + item.qty, 0)))
  }, [basketItems])

  const [mainNavanchorEl, setMainNavAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [adminAnchorEl, setAdminAnchorEl] = React.useState(null);
  const [collectionAnchorEl, setCollectionAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isAdminMenuOpen = Boolean(adminAnchorEl);
  const isCollectionMenuOpen = Boolean(collectionAnchorEl);

  const handleAdminMenuOpen = (event) =>{
    setAdminAnchorEl(event.currentTarget);
  }

  const handleCollectionMenuOpen = (event)=>{
    setCollectionAnchorEl(event.currentTarget)
  }

  const handleCollectionMenuClose = (event)=>{
    setCollectionAnchorEl(null)
    handleNavMenuClose()
  }

  const handleAdminMenuClose = () =>{
    setAdminAnchorEl(null);
  }

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

  const handleSignOut = ()=>{
    handleMenuClose()
    dispatch(signOut())
  }

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
      
      {userInformation?(
        //Need an array to render multiple children in conditional
        [<MenuItem className={classes.Link} key={1} component={RouterLink} to='/account' onClick={handleMenuClose}>My account</MenuItem>,
        <MenuItem className={classes.Link} key={2} component={RouterLink} to='/' onClick={handleSignOut}>Sign Out</MenuItem>]): 
        <MenuItem className={classes.Link} component={RouterLink} to='/login' onClick={handleMenuClose}>Sign In</MenuItem>}
      
      
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
        className={classes.Link} component={RouterLink} to='/basket'
        onClick={handleMobileMenuClose}
      >
        {/* style={{transform: 'translate(74%, -69%)'}} */}
        <MyBadge badgeContent={itemCount} color="primary">
          <ShoppingBasketIcon style={{color:"black"}}/>
          
        </MyBadge>
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
    <div className={classes.grow} >
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
            <MenuItem onClick={handleCollectionMenuOpen}>Collection</MenuItem>
            <MenuItem onClick={handleNavMenuClose} className={classes.Link} component={RouterLink} to='/about'>About Us</MenuItem>
            <MenuItem onClick={handleNavMenuClose} className={classes.Link} component={RouterLink} to='/custom'>Custom Work</MenuItem>
            <MenuItem onClick={handleNavMenuClose} className={classes.Link} component={RouterLink} to='/contact'>Contact Us</MenuItem>
          </Menu>
          <Menu title='Collection' anchorEl={collectionAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} id='collectionnMenu'
              keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={isCollectionMenuOpen} onClose={handleCollectionMenuClose}
          >
            <MenuItem onClick={handleCollectionMenuClose} className={classes.Link} component={RouterLink} to='/necklaces'>Necklaces & Pendants</MenuItem>
            <MenuItem onClick={handleCollectionMenuClose} className={classes.Link} component={RouterLink} to='/earrings'>Earrings</MenuItem>
            <MenuItem onClick={handleCollectionMenuClose} className={classes.Link} component={RouterLink} to='/rings'>Rings</MenuItem>
            <MenuItem onClick={handleCollectionMenuClose} className={classes.Link} component={RouterLink} to='/bracelets'>Bracelets</MenuItem>
          </Menu>
          
          {/* <Image alt="Example Alt" src="https://sikra.s3.us-east-2.amazonaws.com/logo-%2Bhigh%2Bres4.png" /> */}
          {/* <Typography className={classes.Link} component={RouterLink} to='/' className={classes.title} variant="h6" noWrap>
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
          <Route render={({ history }) => <SearchBox history={history} className={classes.SearchBox}/>} />
          </div>
          {/* <div className={classes.search}> */}
            {/* <div className={classes.searchIcon}>
              <SearchIcon style={{color:"black"}}/>
            </div> */}
            {/* <TextField
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
          </div> */}
          
          <div className={classes.grow} />
          {/* {userInformation?(
            <Typography variant="h6" className={classes.title} style={{color:'black'}}>
              {userInformation.name}
            </Typography>): null} */}
          <div className={classes.sectionDesktop}>

              <IconButton
                aria-label="cart"
                aria-controls="cart"
                aria-haspopup="true"
                color="inherit"
                className={classes.Link} component={RouterLink} to='/basket'
                
                >

            <MyBadge badgeContent={itemCount} color='primary'>
              <ShoppingBasketIcon style={{color:"black"}}/>
            </MyBadge>

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
          {userInformation && userInformation.isAdmin && (
          <Toolbar>
          <IconButton
            edge="start"
            
            color="inherit"
            aria-label="open drawer"
            onClick={handleAdminMenuOpen}
          >
        
            <SupervisorAccountIcon style={{color:"black"}}/>
            </IconButton>
            <Menu title='Admin'
              anchorEl={adminAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              id='adminMenu'
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isAdminMenuOpen}
              onClose={handleAdminMenuClose}
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
            </Menu>
            {/* <Menu title='Collection'
              anchorEl={collectionAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              id='collectionnMenu'
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={isCollectionMenuOpen}
              onClose={handleCollectionMenuClose}
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
            </Menu> */}
            </Toolbar>
            )}

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}


export default Navbar;