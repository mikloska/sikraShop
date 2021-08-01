import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Grid, Typography} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Link as RouterLink } from 'react-router-dom';



const useStyles = makeStyles({
  root: {
    bottom: 0,
    marginTop:'auto',
    backgroundColor: 'teal',
    width: "100%",
    marginTop : 35,
    paddingTop: 35,
    height: 260
  },
  FooterNav: {
    // marginTop: 70
  },
  ScrollIcon: {
    '&:hover':{opacity:0.5},
    cursor: 'pointer',
    bottom: -53,
    position: 'relative',
    display: 'block',
    margin: 'auto',
    transform: "rotate(-90deg)",
  },
  SocialMediaIcons: {
    '&:hover':{opacity:0.5},
  }
});

export default function Footer({handleScrollClick}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <PlayCircleFilledIcon lg={12} fontSize="large" className={classes.ScrollIcon} onClick={handleScrollClick}/>
    <Grid container alignItems="center" justifyContent="center" value={value} onChange={(event, newValue) => {setValue(newValue);}} className={classes.root}>
      {/* <Grid item component={PlayCircleFilledIcon} lg={12} fontSize="large" className={classes.ScrollIcon}/> */}
      {/* <Grid item lg={2} xs={12} style={{textAlign:"center"}} className={classes.FooterItems} label="Necklaces & Pednants" value="Necklaces" style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/necklaces'><Typography>Necklaces & Pendants</Typography></Grid>
      <Grid item lg={1} xs={12} style={{textAlign:"center"}} className={classes.FooterItems} label="Rings" value="Rings" style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/rings'><Typography></Typography>Rings</Grid>
      <Grid item lg={1} xs={12} style={{textAlign:"center"}} className={classes.FooterItems} label="Earrings" value="earrings" style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/earrings'><Typography></Typography>Earrings</Grid>
      <Grid item lg={1} xs={12} style={{textAlign:"center"}} className={classes.FooterItems} label="Bracelets" value="bracelets" style={{ color: 'inherit', textDecoration: 'inherit'}} component={RouterLink} to='/bracelets'><Typography>Bracelets</Typography></Grid> */}
      <Grid item sm={12} style={{textAlign:"center"}}><Typography>Copyright © {new Date().getFullYear()} Sikra Jewelry</Typography></Grid>
      <Grid item sm={12} style={{textAlign:"center"}}>
        <a href='https://www.facebook.com/SikraJewelry/' target="_blank"><FacebookIcon className={classes.SocialMediaIcons} fontSize="large" style={{ color: 'black', textDecoration: 'none'}}/></a>
        <a href='https://www.instagram.com/sikrajewelry/?hl=en' target="_blank"><InstagramIcon className={classes.SocialMediaIcons} fontSize="large" style={{ color: 'black', textDecoration: 'none'}}/></a></Grid>

    </Grid>
    </div>
    
  );
}
