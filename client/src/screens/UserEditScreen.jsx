import React, { useState, useEffect } from 'react';
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {getUserDetails, adminUpdateUser} from '../actions/userActions'
import { USER_ADMIN_UPDATE_RESET } from '../constants/userConstants'

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

const UserEditScreen = ({ match, history }) => {
  const userId=match.params.id
  const classes = useStyles();
  // const history = useHistory();
  //state to store input field values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const dispatch=useDispatch()
  //Get userRegister from state and destructure what we need from it
  const userDetails=useSelector(state=>state.userDetails)
  const {loading,error,user}=userDetails

  const userAdminUpdate = useSelector((state) => state.userAdminUpdate)
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate,} = userAdminUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_ADMIN_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      //Conditional had user.name, but on first render after update error would say cannot read prop name of undefined.  Now I check the entire user object as is
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminUpdateUser({ _id: userId, name, email}))
  };



  return (
    <Container component="main" maxWidth="xs">
      <Paper pt={0} elevation={7}>
        <Card className={classes.card} >
          <Box p={6} >
            <div className={classes.paper} >
              <Avatar className={classes.avatar} >
                <PermIdentityIcon/>
              </Avatar>
               <Typography component="h1" variant="h5">
                Edit User Info
              </Typography>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message severity='error'>{errorUpdate}</Message>}
              {loading ? <Loader />: error ? <Message severity='error'>{error}</Message> :(

                <form className={classes.form} noValidate onSubmit={handleSubmit} >
                <TextField variant="outlined" margin="normal" required fullWidth id="name" label="Name"
                  name="name" autoComplete="name" value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <TextField variant="outlined" margin="normal" required fullWidth id="email"
                    label="Email Address" name="email" autoComplete="email" value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Update
                  </Button>
                </form>
              )}
  

            </div>
          </Box>
        </Card>
      </Paper>
    </Container>
  );
}

export default UserEditScreen