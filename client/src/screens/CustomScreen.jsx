import React from 'react'

import {Avatar, Button, Card, CssBaseline, TextField, Link, Grid, Box, Paper, Checkbox, Typography, Divider, Container} from '@material-ui/core';
import CustomGallery from '../components/CustomGallery'



const CustomScreen = () =>{

  
  return (
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
      
      <Typography variant='h4' style={{marginBottom:40}}>Custom Pieces</Typography>
      <CustomGallery/>
      
    </div>

  )

}

export default CustomScreen