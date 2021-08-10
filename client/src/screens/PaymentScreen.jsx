import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container, Checkbox, FormControlLabel} from '@material-ui/core';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import PaymentIcon from '@material-ui/icons/Payment';
import { Link as RouterLink } from 'react-router-dom';
import {signIn} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { savePaymentMethod } from '../actions/basketActions';
import CheckoutSteps from '../components/CheckoutSteps'
// const CustomLock = withStyles((theme) => ({
//   lock: {
//     backgroundColor:'#067e78'
//   },
// }))(LockOpenIcon);
// const CustomLock = styled(LockOpenIcon)({
//   color:'#067e78'
//   // color:linear-gradient(120deg, #28ccc4, #067e78),
// });

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
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },
  googleBtn: {
    margin: theme.spacing(0, 0, 0),
  },
}));

const PaymentScreen = ({ history }) => {
  const classes = useStyles();
  const basket = useSelector((state) => state.basket)
  const { shippingAddress } = basket

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }


  return (
    <div>
      <CheckoutSteps step1 step2 step3 tab={2}/>
    
    <Container component="main" maxWidth="xs">
      
      <Paper pt={0} elevation={7} >
        <Card className={classes.card}>
          <Box p={6} >
            <div className={classes.paper} >
              <Avatar className={classes.avatar} style={{marginBottom: 20}}>
                <PaymentIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Payment
              </Typography>
              {/* {error && <Message severity='error'>{error}</Message>} */}
              {/* {loading && <Loader />} */}
              <form className={classes.form} noValidate onSubmit={handleSubmit} >


                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} style={{marginBottom: 20}}>
                  Submit
                </Button>
                <Grid container>
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox  id='PayPal' value='paypal' onChange={(e) => setPaymentMethod(e.target.value)} name="paymentMethod" />}
                      label='PayPal or Credit Card'
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox  id='Stripe' value='stripe' onChange={(e) => setPaymentMethod(e.target.value)} name="paymentMethod" />}
                      label='Stripe'
                    />
                  </Grid>

                </Grid>
              </form>


            </div>
          </Box>
        </Card>
      </Paper>
    </Container>
    </div>
  );
}

export default PaymentScreen