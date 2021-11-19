import React from 'react'
import {Typography} from '@material-ui/core';
import CustomGallery from '../components/CustomGallery'
import { Link as RouterLink } from 'react-router-dom';


const CustomScreen = () =>{

  
  return (
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
      <Typography variant='h4' style={{marginBottom:40}}>Custom Pieces</Typography>
      <Typography variant='subtitle1' style={{marginBottom:20}}><RouterLink style={{color:'#067e78'}} to={'/contact'}>Conact us</RouterLink> if you would like a custom piece made!</Typography>
      <CustomGallery/>
    </div>
  )

}

export default CustomScreen