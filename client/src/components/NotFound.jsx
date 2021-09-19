import React, {useEffect} from 'react'
import {Alert} from '@material-ui/lab';
import { useLocation } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core';

const NotFound = () =>{

  const location = useLocation();

  return (
    <div style={{marginTop:35}}>         
      <Grid container justifyContent='center'>
        <Grid item md={11} sm={11}>
          <Alert severity='error'><Typography variant='h6'><b>'{location.pathname.slice(1)}'</b>   not found</Typography></Alert>
        </Grid>
      </Grid>
    </div>
  )
}

export default NotFound