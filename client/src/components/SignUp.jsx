import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {Avatar, Button, Card, CssBaseline, TextField, Link, Grid, Box, Checkbox, Typography, Divider, Container} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HouseIcon from '@material-ui/icons/House';
import { makeStyles } from '@material-ui/core/styles';
// import GoogleIcon from './GoogleIcon';
// import api from '../axios/axios';
import { useHistory } from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Sikra Jewelry
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(5),
    // height="100%"
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleBtn: {
    margin: theme.spacing(0, 0, 0),
  },
}));

export default function SignUp({isLoggedIn, setIsLoggedIn}) {
  const classes = useStyles();
  const history = useHistory();
  //state to store input field values
  const [emails, setEmails] = useState('');
  const [passwords, setPasswords] = useState('');
  const [confirm, setConfirm] = useState('');

  console.log('history ', history)
  //submit fxn to make http call to BE
  const checkPasswords = (e) => {
    if(passwords === confirm) handleSubmit(e)
  }
  const handleSubmit = (e) => {
  
  
    // e.preventDefault();
  
    //   api({
    //     method: 'post',
    //     url: '/signup',
    //     data: {
    //       emails,
    //       passwords,
    //     },
    //   }).then((res) => {
    //     console.log(res.data.isLoggedIn);
    //     setIsLoggedIn(res.data.isLoggedIn)
        
        
    //   });
  };

  if(isLoggedIn) return <Redirect to="/"/>;

  return (
    <Container component="main" maxWidth="xs" mt={5}>
      <Box mt={8} pt={0}>
        <Card classsName={classes.card} >
          <Box p={3} >
            <CssBaseline />
            <div className={classes.paper} >
              <Avatar className={classes.avatar} >
                <LockIcon />
              </Avatar>
              {/* <div>
                <img src="https://i.imgur.com/q7xlJjy.png" />
              </div> */}
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form className={classes.form} noValidate onSubmit={checkPasswords}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="emails"
                  label="Email Address"
                  name="emails"
                  autoComplete="emails"
                  value={emails}
                  onChange={(e) => {
                    setEmails(e.target.value);
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="passwords"
                  label="Password"
                  type="password"
                  id="passwords"
                  autoComplete="current-password"
                  value={passwords}
                  onChange={(e) => {
                    setPasswords(e.target.value);
                  }}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm password"
                  autoComplete="current-password"
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
                  Sign Up
                </Button>
                <Grid container>
                  {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  {/* <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid> */}
                </Grid>
              </form>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
                Sign Up With Google
              </Button>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
