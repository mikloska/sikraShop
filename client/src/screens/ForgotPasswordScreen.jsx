import React, { useState, useEffect } from 'react';
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import VpnKey from '@material-ui/icons/VpnKey';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {register} from '../actions/userActions'
import axios from 'axios'

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

const ForgotPasswordScreen = ({ isLoggedIn, setIsLoggedIn }) => {
  const redirect= location.search ? location.search.split('=')[1] : '/'
  const classes = useStyles();
  const history = useHistory();
  //state to store input field values

  const [email, setEmail] = useState('');
  //For customer messages in Message component. Default to null to use in conditional rendering
  const [message, setMessage]=useState(null)
  const [sentMessage, setSentMessage]=useState(null)

  const dispatch=useDispatch()
  //Get userRegister from state and destructure what we need from it
  const userRegister=useSelector(state=>state.userRegister)
  const {loading,error,userInformation}=userRegister

  // useEffect(()=>{
  //   if(userInformation) history.push(redirect)
  // },[history, userInformation, redirect])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email===''){
      setMessage('Enter email address')
    }else{
     axios.post('/api/users/forgotpassword',{email:email})
     setEmail('')
     setSentMessage('Check your email for the password reset link')
    }

  };

  if (isLoggedIn) return <Redirect to="/" />;

  return (
    <Container component="main" maxWidth="xs" style={{marginTop:35, marginBottom: 45, padding:20}}>
      <Paper pt={0} elevation={7}>
        <Card className={classes.card} >
          <Box p={6} >
            <div className={classes.paper} >
              <Avatar className={classes.avatar} >
                <VpnKey/>
              </Avatar>
               <Typography component="h1" variant="h5" style={{marginTop:20}}>
                Enter Email Address
              </Typography>

              {message && <Message style={{marginTop:8}} severity='error' >{message}</Message>}
              {sentMessage!==null && <Message severity='success' style={{marginTop:8}}>{sentMessage}</Message>}
              {error && <Message severity='error' style={{marginTop:8}}>{error}</Message>}
              {loading && <Loader />}

              <form className={classes.form} noValidate onSubmit={handleSubmit} >

                <TextField variant="outlined" margin="normal" required fullWidth name="email" label="Email"
                  type="email" id="email" value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Send Password Reset Link
                </Button>

              </form>
              {/* <Button fullWidth variant="contained" color="primary" className={classes.submit} style={{marginTop: 40}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" style={{marginRight: 10}}/>
                Sign Up With Google
              </Button> */}
            </div>
          </Box>
        </Card>
      </Paper>
    </Container>
  );
}

export default ForgotPasswordScreen