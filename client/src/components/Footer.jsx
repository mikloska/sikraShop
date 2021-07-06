import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'teal',
    width: "100%",
  },
});

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={(event, newValue) => {setValue(newValue);}} showLabels className={classes.root}>
      <BottomNavigationAction label="Necklaces & Pednants" value="Necklaces" />
      <BottomNavigationAction label="Rings" value="Rings" />
      <BottomNavigationAction label="Earrings" value="earrings" />
      <BottomNavigationAction label="Bracelets" value="bracelets" />
     
    </BottomNavigation>
  );
}
