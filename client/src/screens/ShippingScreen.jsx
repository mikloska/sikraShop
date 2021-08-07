import React, { useState } from 'react';
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  card: {
    paddingLeft:20,
    paddingRight:20
    // padding: theme.spacing(5),
    // height="100%"
  },
  paper: {
    // marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // backgroundColor:'#067e78'
    // margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: 40,
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },

}));

const ShippingScreen = ({history}) =>{
  const classes = useStyles();
  const [address,setAddress]=useState('')
  const [city,setCity]=useState('')
  const [zip,setZip]=useState('')
  const [country,setCountry]=useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address,city,zip,country)


  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper pt={0} elevation={7}>
        <Card className={classes.card} >
          <Box p={6} >
            <div className={classes.paper} >
              <Avatar className={classes.avatar} >
                <LocalShippingIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Shipping
              </Typography>
              {/* {error && <Message severity='error'>{error}</Message>}
              {loading && <Loader />} */}
              <form className={classes.form} noValidate onSubmit={handleSubmit} >
                <TextField variant="outlined" margin="normal" required fullWidth id="address"
                  label="Address" name="address" autoComplete="address" value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <TextField variant="outlined" margin="normal" required fullWidth id="city"
                  label="City" name="city" autoComplete="address" value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                  <TextField variant="outlined" margin="normal" required fullWidth id="zip"
                  label="Postal Code" name="zip" autoComplete="zip" value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                />
                <TextField variant="outlined" margin="normal" required fullWidth id="country"
                  label="Country" name="country" autoComplete="address" value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} style={{marginTop: 40}}>
                  Continue to Payment
                </Button>
              </form>
            </div>
          </Box>
        </Card>
      </Paper>
    </Container>
  )
}

export default ShippingScreen