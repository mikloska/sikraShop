import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom'
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Button, TextField, Badge} from '@material-ui/core';
import Image from "material-ui-image";
import MobileMenu from './MobileMenu'
import NavigationMenu from './NavigationMenu'
import ShopMenu from './ShopMenu'
import DesktopRightMenu from './DesktopRightMenu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { changeBadge } from '../../actions/itemCountActions'
import {signOut} from '../../actions/userActions'
import SearchBox from './SearchBox'
import { BASKET_RESET } from '../../constants/basketConstants';

const MyBadge = withStyles((theme) => ({
  badge: {
    left: 7,
    top: -4,
    // backgroundColor:'#067e78'
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  stylebar:{
    background: 'white'
  },
  logo: {
    height:70,
    marginTop: 10,
    marginRight:20
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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

  const [mainNavAnchorEl, setMainNavAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [shopAnchorEl, setShopAnchorEl] = useState(null);
  const isShopMenuOpen = Boolean(shopAnchorEl);
  const handleShopMenuClose = ()=>{
    setShopAnchorEl(null)
    handleNavMenuClose()
  }
  const handleShopMenuOpen = (event)=> setShopAnchorEl(event.currentTarget)
  const handleNavMenuOpen = (event) =>{
    setMainNavAnchorEl(event.currentTarget);
  }

  const handleNavMenuClose = () => setMainNavAnchorEl(null);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSignOut = ()=>{
    handleMenuClose()
    dispatch(signOut())
    dispatch({type:BASKET_RESET})
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
    <div className={classes.grow} >
      <AppBar position="static" className={classes.stylebar}>
        <Toolbar>
          <NavigationMenu menuButtonClass={classes.menuButton} handleNavMenuOpen={handleNavMenuOpen} handleNavMenuClose={handleNavMenuClose} mainNavAnchorEl={mainNavAnchorEl} handleShopMenuOpen={handleShopMenuOpen } linkClass={classes.Link}/>
          <ShopMenu shopAnchorEl={shopAnchorEl} handleShopMenuClose={handleShopMenuClose} isShopMenuOpen={isShopMenuOpen} linkClass={classes.Link}/>
          <Typography variant="h6" className={classes.title} component={RouterLink} to='/'>
            <img src={'https://sikra.s3.us-east-2.amazonaws.com/logo-%2Bhigh%2Bres4.png'} alt="logo" className={classes.logo} />
          </Typography>
          <div className={classes.search}>
            <Route render={({ history }) => <SearchBox history={history} className={classes.SearchBox}/>} />
          </div>
          <div className={classes.grow} />
          <DesktopRightMenu desktopClass={classes.sectionDesktop} MyBadge={MyBadge} itemCount={itemCount} anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleMobileMenuClose={handleMobileMenuClose}
            menuId={menuId} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} handleSignOut={handleSignOut} userInformation={userInformation} linkClass={classes.Link} handleMenuClose={handleMenuClose}/>
          <div className={classes.sectionMobile}>
            <IconButton aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true"
              onClick={handleMobileMenuOpen} color="inherit"
            >
              <MoreIcon style={{color:"black"}}/>
            </IconButton>
          </div>
          <MobileMenu userInformation={userInformation} MyBadge={MyBadge} mobileMoreAnchorEl={mobileMoreAnchorEl} mobileMenuId={mobileMenuId}
            isMobileMenuOpen={isMobileMenuOpen} handleMobileMenuClose={handleMobileMenuClose} itemCount={itemCount} linkClass={classes.Link}
            anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuId={menuId} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} 
            handleSignOut={handleSignOut} userInformation={userInformation} linkClass={classes.Link} handleMenuClose={handleMenuClose}
          />
        </Toolbar>

      </AppBar>
    </div>
  );
}


export default Navbar;