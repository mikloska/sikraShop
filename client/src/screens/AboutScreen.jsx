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
      <Grid container justifyContent='center' spacing={5}>
        <Grid item md={5} sm={12} xs={12}>
          <img style={{width:'100%'}}src='https://sikra.s3.us-east-2.amazonaws.com/Bodiam_029_large.jpg'/>
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Typography variant='h6'>Our Designer</Typography>
          <Typography>
          From an early age, Sára Vajda has experimented with creating jewelry out of various natural materials, including wood, leather, silver and gold. She eventually found her passion in working with precious metals and mastered her craft at the prestigious Koós Károly School of the Arts in Hungary, from where she graduated in 2009.  For years, she has worked with master goldsmiths in Hungary and the United States. She has also created her own custom jewelry for engagements, weddings, birthdays, graduations and other celebrations. It was her success with giving her customers beautiful and creative custom pieces that led her to bring Sikra Jewelry to life. Sara takes great pride in being able to craft her jewelry from raw materials.  Her pieces reflect her love of nature and are the fruit of her ability to work with the utmost precision while maintaining a vivid imagination and a touch of whimsy.  
          </Typography>

          <Typography variant='h6' style={{marginTop:20}}>Sikra Jewelry</Typography>
          <Typography>
          Sikra Jewelry was founded in 2014 and our designer Sára Vajda has been working on perfecting her unique, handcrafted pieces ever since. She draws her inspiration from nature and her jewelry reflects the patterns and forms she encounters in diverse landscapes like forests, deserts, rivers and oceans. All of these pieces are crafted from high quality recycled gold and nickel-free silver and are finished with lead-free enamel.  At Sikra Jewelry we are always dreaming up unique ways to blend elements from nature, folk motifs and the modern world in a way that brings to life unique wearable works of art.  We invite you to celebrate nature by adding our unique pieces to your own collection or giving them as gifts.
          </Typography>
        </Grid>
      </Grid>
    
    {/* <Paper pt={0} elevation={7}>
   
      
    </Paper> */}
    </div>

  )

}

export default AboutScreen