import React, { useState } from 'react';
import {Avatar, Button, Card, TextField, Box, Paper, Typography, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../components/Message'
import VpnKey from '@material-ui/icons/VpnKey';
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

const ForgotPasswordScreen = () => {
  const classes = useStyles();
  //state to store input field values

  const [email, setEmail] = useState('');
  //For customer messages in Message component. Default to null to use in conditional rendering
  const [message, setMessage]=useState(null)
  const [sentMessage, setSentMessage]=useState(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email===''){
      setMessage('Enter email address')
    }else{
      setMessage(null)
      try{
        await axios.post('/api/users/forgotpassword',{email:email})
        setSentMessage('Check your email for the password reset link')
        setEmail('')
      }catch(error){
        console.log(error)
        setMessage('No user with that email')
      }
    }

  };
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
            </div>
          </Box>
        </Card>
      </Paper>
    </Container>
  );
}

export default ForgotPasswordScreen