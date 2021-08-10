import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link as RouterLink } from 'react-router-dom';
import {signIn} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
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

const SignInScreen = ({ location, history }) => {
  //Define redirect to send users to route if there is an added redirect
  // const redirect= '/'
  const redirect= location==undefined ? '/':location.search.split('=')[1]
  // const redirect= location.search && location!==undefined ? location.search.split('=')[1] : '/'
  const classes = useStyles();
  //state to store input field values
  const dispatch=useDispatch()
  //Get userLogin from state and destructure what we need from it
  const userLogin=useSelector(state=>state.userLogin)
  const {loading,error,userInformation}=userLogin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Redirect if logged in 
  useEffect(()=>{
    if(userInformation && history) history.push(redirect)
  },[history, userInformation, redirect])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signIn(email,password))
  };


  return (
    <Container component="main" maxWidth="xs" style={{zIndex:100000,margin:'auto',position:'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center'}}>
      <Paper pt={0} elevation={7} >
        <Card className={classes.card}>
          <Box p={6} >
            <div className={classes.paper} >
              <Avatar className={classes.avatar} style={{marginBottom: 20}}>
                <LockOpenIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              {error && <Message severity='error'>{error}</Message>}
              {loading && <Loader />}
              <form className={classes.form} noValidate onSubmit={handleSubmit} >
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

                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} style={{marginBottom: 20}}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs={11}>
                    <Link href="#" variant="body2" color='inherit'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item xs={11} style={{marginBottom: 20}}>
                    <Link component = {RouterLink} to={redirect ? `/signup?redirect=${redirect}`:'/signup'} variant="body2" color='inherit'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>

              <Button fullWidth variant="contained" color="primary" className={classes.submit}  style={{marginTop: 50}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" style={{marginRight: 10}}/>
                Sign In With Google
              </Button>
            </div>
          </Box>
        </Card>
      </Paper>
    </Container>
  );
}

export default SignInScreen