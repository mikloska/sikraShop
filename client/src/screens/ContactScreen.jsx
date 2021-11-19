import React, { useState } from 'react';
import {Avatar, Card, TextField, Box, Paper, Typography, Container, List} from '@material-ui/core';
import CustomButton from '../components/CustomButton' 
import { makeStyles } from '@material-ui/core/styles';
import emailjs from 'emailjs-com';
import EmailIcon from '@material-ui/icons/Email';
import Alert from '@material-ui/lab/Alert';


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

}));

const ContactScreen = () => {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(false);
  const classes = useStyles();
  const sendEmail = async (e) =>{
    e.preventDefault();
    await emailjs.sendForm('service_471bwwg', 'template_4ag980g', e.target, 'user_C1QZMlOYTLCRsiOKkwxXB')
    setAlert(true)
    setSubject('')
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
                <TextField variant="outlined" margin="normal" required fullWidth name="user_email" label='Email Address' type="email"
                  id="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField variant="outlined" margin="normal" required fullWidth id="subject" label='Subject'
                  name="user_subject" value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <List>
                  {alert===true && <Alert severity="success">Email sent!</Alert>}
                </List>
		            <TextField style={{marginTop:20}} fullWidth multiline aria-label="empty textarea" value={message} 
                  onChange={(e) => {setMessage(e.target.value);}}
                placeholder='Message' name="message"/>
                <CustomButton value="send" text={'Send'}/> 
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