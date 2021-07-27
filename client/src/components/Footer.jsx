import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Grid, Typography} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';



const useStyles = makeStyles({
  root: {
    marginTop:'auto',
    backgroundColor: 'teal',
    width: "100%",
    marginTop : 35,
    height: 260
  },
  FooterNav: {
    // marginTop: 70
  },
  // ScrollIcon: {
    // top: -70,
    // transform: "rotate(-90deg)",
    // position: ""
  // }
});

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center" value={value} onChange={(event, newValue) => {setValue(newValue);}} className={classes.root}>
        {/* <Grid item component={PlayCircleFilledIcon} lg={12} fontSize="large" className={classes.ScrollIcon}/> */}
        <Grid item lg={2} xs={12} style={{textAlign:"center"}} className={classes.FooterItems} label="Necklaces & Pednants" value="Necklaces"><Typography>Necklaces & Pendants</Typography></Grid>
        <Grid item lg={1} xs={12} style={{textAlign:"center"}} className={classes.FooterItems} label="Rings" value="Rings"><Typography></Typography>Rings</Grid>
        <Grid item lg={1} xs={12} style={{textAlign:"center"}} className={classes.FooterItems} label="Earrings" value="earrings"><Typography></Typography>Earrings</Grid>
        <Grid item lg={1} xs={12} style={{textAlign:"center"}} className={classes.FooterItems} label="Bracelets" value="bracelets"><Typography>Bracelets</Typography></Grid>
      
        <Grid item sm={12} style={{textAlign:"center"}}><FacebookIcon/><InstagramIcon/></Grid>

      </Grid>
    </div>
  );
}
