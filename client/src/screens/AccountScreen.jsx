import React, { useState, useEffect } from 'react';
import { Redirect as redirect } from 'react-router-dom';
import {Avatar, Button, Card, CssBaseline, TextField, Link, Grid, Box, Paper, Checkbox, 
Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Divider, Container} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {getUserDetails, updateUser} from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import CancelIcon from '@material-ui/icons/Cancel';
import { USER_UPDATE_RESET } from '../constants/userConstants'
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

const AccountScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  //For customer messages in Message component. Default to null to use in conditional rendering
  const [message, setMessage]=useState(null)

  const dispatch=useDispatch()
  
  const userDetails=useSelector(state=>state.userDetails)
  const {loading,error,user}=userDetails

  const userLogin=useSelector(state=>state.userLogin)
  const {userInformation}=userLogin

  const userUpdate=useSelector(state=>state.userUpdate)
  const {success}=userUpdate
  

  const orderListOfUser=useSelector(state=>state.orderListOfUser)
  const {loading: loadingOrders,error:errorOrders,orders}=orderListOfUser

  const classes = useStyles();
  // const history = useHistory();
  //state to store input field values





  useEffect(()=>{
    if(!userInformation) {
      history.push('/login')
    }else{
      if(!user || !user.name || success){
        dispatch({ type: USER_UPDATE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      }else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  },[dispatch, history, userInformation, user, success])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password!==confirm){
      setMessage('Passwords do not match!')
    }else{
      dispatch(updateUser({id:user._id,name,email,password}))
    }

  };

  // if (isLoggedIn) return <Redirect to="/" />;

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={6}>
      <Grid item md={3} sm={11}>
        <Paper elevation={7} style={{padding:20}}>
        <Typography variant="h5">
          {name}'s Account
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


        </Paper>
      </Grid>
      <Grid item md={8} sm={11} style={{marginLeft:50}}>
        <Paper elevation={7} style={{padding:20}}>
        <Typography variant="h5">
          Orders
        </Typography>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message severiy='error'>{errorOrders}</Message>
        ) : (
          // <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>TOTAL</TableCell>
                <TableCell>PAID</TableCell>
                <TableCell>DELIVERED</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                    {order.isPaid ? (
                      <TableCell>{order.paidAt.substring(0, 10)}</TableCell>
                    ) : (
                      <TableCell> </TableCell>
                    )}
                  
                  
                    {order.isDelivered ? (
                      <TableCell>{order.deliveredAt.substring(0, 10)}</TableCell>
                    ) : (
                      <TableCell> </TableCell>
                    )}
            
                  <TableCell>
                    <RouterLink to={`/orders/${order._id}`} style={{color:'#067e78'}}>
                      <Button style={{color:'#067e78'}}>
                        Details
                      </Button>
                    </RouterLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          // </TableContainer>
        )}





      </Paper>
      </Grid>

    </Grid>

  );
}

export default AccountScreen



