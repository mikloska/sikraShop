import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Button, Card, CssBaseline, TextField, Link, Grid, Box, Paper, Checkbox, Typography, Divider, Container} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

}));

const AboutScreen = () =>{
  const classes = useStyles();
  return (
    <div className={classes.root} style={{marginTop:35, marginBottom: 45, padding:20}}>
       <Typography variant='h4' style={{marginBottom:40}}>About Us</Typography>
    
    <Paper pt={0} elevation={7}>
   
      
    </Paper>
    </div>

  )

}

export default AboutScreen