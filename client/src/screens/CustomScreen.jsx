import React from 'react'

import {Avatar, Button, Card, CssBaseline, TextField, Link, Grid, Box, Paper, Checkbox, Typography, Divider, Container} from '@material-ui/core';
import CustomGallery from '../components/CustomGallery'



const CustomScreen = () =>{

  
  return (
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
      
      <Typography variant='h4' style={{marginBottom:40}}>Custom Pieces</Typography>
      
      {/* <Paper pt={0} elevation={7}> */}
      <CustomGallery/>
      {/* <ImageGallery items={images} /> */}
        {/* <div style={{width:400}}>
            <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom1.jpg" />
            <p className="legend">Legend 1</p>
        </div>
        <div>
            <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom2.jpg" />
            <p className="legend">Legend 2</p>
        </div>
        <div>
            <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom3.jpg" />
            <p className="legend">Legend 3</p>
        </div>
        <div>
            <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom4.jpg" />
            <p className="legend">Legend 3</p>
        </div>
        <div>
            <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom5.jpg" />
            <p className="legend">Legend 3</p>
        </div>
        <div>
            <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom6.jpg" />
            <p className="legend">Legend 3</p>
        </div>
        <div>
            <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom7.jpg" />
            <p className="legend">Legend 3</p>
        </div>
        <div>
            <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom8.jpg" />
            <p className="legend">Legend 3</p>
        </div>
        <div>
            <img className={classes.Images} src="https://sikra.s3.us-east-2.amazonaws.com/favorites/custom9.jpg" />
            <p className="legend">Legend 3</p>
        </div> */}
            

    
        
      {/* </Paper> */}
      
    </div>

  )

}

export default CustomScreen