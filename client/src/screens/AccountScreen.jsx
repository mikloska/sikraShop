import React, { useState, useEffect } from 'react';
import { Redirect as redirect } from 'react-router-dom';
import {Avatar, Button, Card, CssBaseline, TextField, Link, Grid, Box, Paper, Checkbox, Typography, Divider, Container} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {getUserDetails, updateUser} from '../actions/userActions'
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
    marginTop: theme.spacing(4),
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

const AccountScreen = ({ isLoggedIn, setIsLoggedIn }) => {
  const classes = useStyles();
  const history = useHistory();
  //state to store input field values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  //For customer messages in Message component. Default to null to use in conditional rendering
  const [message, setMessage]=useState(null)

  const dispatch=useDispatch()
  //Get userRegister from state and destructure what we need from it
  const userDetails=useSelector(state=>state.userDetails)
  const {loading,error,user}=userDetails

  const userLogin=useSelector(state=>state.userLogin)
  const {userInformation}=userLogin

  const userUpdate=useSelector(state=>state.userUpdate)
  const {success}=userUpdate

  useEffect(()=>{
    if(!userInformation) {
      history.push('/login')
    }else{
      if(!user.name){
        dispatch(getUserDetails('profile'))
      }else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  },[dispatch, history, userInformation, user])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password!==confirm){
      setMessage('Passwords do not match!')
    }else{
      dispatch(updateUser({id:user._id,name,email,password}))
    }

  };

  if (isLoggedIn) return <Redirect to="/" />;

  return (
    <Grid container>
      <Grid item md={3}>
        <Typography variant="h5">
          {user.name}'s Account
        </Typography>
        {message && <div style={{margin:8}}><Message severity='error' >{message}</Message></div>}
        {success && <div style={{margin:8}}><Message severity='success' >Profile Successfully Updated!</Message></div>}
        {error && <Message severity='error'>{error}</Message>}
        {loading && <Loader />}
        <form className={classes.form} noValidate onSubmit={handleSubmit} >
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            // autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="Confirm Password"
            type="password"
            id="confirm"
            // autoComplete="confirm"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          />
          {/* <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Udpate
          </Button>

        </form>

        <Typography
          component="h3"
          variant="h5"
          className={classes.submit}
        >
          <Divider />
        </Typography>



      </Grid>
      <Grid item md={8} style={{marginLeft:50}}>
        <Typography variant="h5">
          Orders
        </Typography>
      </Grid>

    </Grid>

  );
}

export default AccountScreen




