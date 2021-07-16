import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Grid, Typography} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';



const useStyles = makeStyles({
  root: {
    position: 'relative',
    bottom: 0,
    backgroundColor: 'teal',
    width: "100%",
    marginTop : 35,
    height: 260
  },
});

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid container alignItems="center" value={value} onChange={(event, newValue) => {setValue(newValue);}} className={classes.root}>
        <Grid item lg={3} xs={12} style={{textAlign:"center"}} label="Necklaces & Pednants" value="Necklaces"><Typography>Necklaces & Pendants</Typography></Grid>
        <Grid item lg={3} xs={12} style={{textAlign:"center"}} label="Rings" value="Rings"><Typography></Typography>Rings</Grid>
        <Grid item lg={3} xs={12} style={{textAlign:"center"}} label="Earrings" value="earrings"><Typography></Typography>Earrings</Grid>
        <Grid item lg={3} xs={12} style={{textAlign:"center"}} label="Bracelets" value="bracelets"><Typography>Bracelets</Typography></Grid>
        <Grid item sm={12} style={{textAlign:"center"}}><FacebookIcon/><InstagramIcon/></Grid>

      </Grid>
    </div>
  );
}
