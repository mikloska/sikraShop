import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link as RouterLink } from 'react-router-dom';
import {signIn} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CheckoutSteps from '../components/CheckoutSteps'
import CustomButton from '../components/CustomButton'
import {getUserDetails} from '../actions/userActions'
import { GUEST_TRUE, GUEST_FALSE } from '../constants/userConstants';

const useStyles = makeStyles((theme) => ({
  card: {
    paddingLeft:20,
    paddingRight:20
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  googleBtn: {
    margin: theme.spacing(0, 0, 0),
  },
}));

const SignInScreen = ({ location, history }) => {
  const basketItems= useSelector(state=>state.basket.basketItems)
  const guest= useSelector(state=>state.guest.guestCheckout)
  const tab = 0
  const redirect= location.search && location!==undefined ? location.search.split('=')[1] : '/'
  const classes = useStyles();
  //state to store input field values
  const dispatch=useDispatch()
  const guestCheckout=()=>{
    dispatch({type:GUEST_TRUE})
    history.push('/shipping')
  }
  //Get userLogin from state and destructure what we need from it
  const userLogin=useSelector(state=>state.userLogin)
  const {loading,error,userInformation}=userLogin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Redirect if logged in 
  useEffect(()=>{
    if(userInformation){
      dispatch({type:GUEST_FALSE})
      dispatch(getUserDetails('profile'))
      history.push(redirect)
      
    } 
  },[history, userInformation, redirect])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signIn(email,password))
    dispatch({type:GUEST_FALSE})
    
  };


  return (
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
    {basketItems.length>0 && <CheckoutSteps step1 step2 step3 tab={tab}/>}
    <Container component="main" maxWidth="xs" >
      <Paper pt={0} elevation={7} >
        <Card className={classes.card}>
          <Box p={6} >
            <div className={classes.paper} >
              <Avatar className={classes.avatar}>
                <LockOpenIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              {error && <Message severity='error'>{error}</Message>}
              {loading && <Loader />}
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address"
                  name="email" autoComplete="email" value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password"
                  id="password" autoComplete="current-password" value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <CustomButton text={'Sign In'} />
                <Grid container>
                  <Grid item xs={11}>
                    <Link component={RouterLink} to='/forgotpassword' variant="body2" color='inherit'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item xs={11} style={{marginBottom: 20}}>
                    <Link component = {RouterLink} to={redirect ? `/signup?redirect=${redirect}`:'/signup'} variant="body2" color='inherit'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                  <Grid item xs={11} style={{paddingLeft:0,marginBottom: 20}}>
                    <Button variant="contained" color='inherit' onClick={()=>guestCheckout()}>
                      <strong>{"Check out as guest"}</strong>
                    </Button>
                  </Grid>
                </Grid>
              </form>

              {/* <Button fullWidth variant="contained" color="primary" className={classes.submit}  >
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" style={{marginRight: 10}}/>
                Sign In With Google
              </Button> */}
            </div>
          </Box>
        </Card>
      </Paper>
    </Container>
    </div>
  );
}

export default SignInScreen