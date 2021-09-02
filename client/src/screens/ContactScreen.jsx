import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container, List, ListItem} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import emailjs from 'emailjs-com';
import EmailIcon from '@material-ui/icons/Email';
import Alert from '@material-ui/lab/Alert';


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
    color:'white',
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },

}));

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(false);


  const classes = useStyles();

  const sendEmail =(e) =>{
    e.preventDefault();
    console.log(e.target)

    emailjs.sendForm('service_471bwwg', 'template_4ag980g', e.target, 'user_C1QZMlOYTLCRsiOKkwxXB')
      .then((result) => {
        console.log(result.text);  
      }
      , (error) => {
        console.log(error.text);
      });
      setAlert(true)
      setName('')
      setEmail('')
      setMessage('')
  }


  return (
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
    <Container component="main" maxWidth="xs" >
      <Paper pt={0} elevation={7} >
        <Card className={classes.card}>
          <Box p={6} >
            <div className={classes.paper} >
              <Avatar className={classes.avatar}>
                <EmailIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Contact Us
              </Typography>
              <form className={classes.form} noValidate onSubmit={sendEmail}>
                <TextField variant="outlined" margin="normal" required fullWidth id="name" label='Name'
                  name="user_name" value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <TextField variant="outlined" margin="normal" required fullWidth name="user_email" label='Email Address' type="email"
                  id="email" value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <List>
                  {alert===true && <Alert severity="success">Email sent!</Alert>}
                </List>
		            <TextField style={{marginTop:20}} fullWidth multiline aria-label="empty textarea" value={message} 
                  onChange={(e) => {setMessage(e.target.value);}}
                placeholder='Message' name="message"/>

                <Button value="send" type="submit" fullWidth variant="contained" className={classes.submit} > 
                  Send
                </Button>

              </form>

            </div>
          </Box>
        </Card>
      </Paper>
    </Container>
    </div>
  );
}

export default ContactScreen