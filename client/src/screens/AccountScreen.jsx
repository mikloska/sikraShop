import React, { useState, useEffect } from 'react';
import {Button, TextField, Grid, Paper, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, 
  Divider, FormGroup, FormControlLabel} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import CustomButton from '../components/CustomButton'
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {getUserDetails, updateUser} from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { USER_UPDATE_RESET } from '../constants/userConstants'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  divider: {
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },
  Box: {
    width:50
  },
  Icon: {
    color: '#8a0b20',
  },
  card: {
    paddingLeft:20,
    paddingRight:20
  },
  paper: {
    marginTop: theme.spacing(4),
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

const AccountScreen = ({ location, history }) => {
  let states=useSelector(state=>state.states)
  states = Object.keys(states)
  const [userUpdatePassword, setUserUpdatePassword] = useState(false)
  const provinces=useSelector(state=>state.provinces)
  const countries=useSelector(state=>state.countries)
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
  const [address,setAddress]=useState('')
  const [updated,setUpdated]=useState(false)
  const [city,setCity]=useState('')
  const [zip,setZip]=useState('')
  const [country,setCountry]=useState('')
  const [state,setState]=useState('')
  const [province,setProvince]=useState('')
  const [mailingList, setMailingList] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({address:address,city:city,state:state,province:province,country:country,zip:zip})

  useEffect(()=>{
    if(!userInformation) {
      history.push('/login')
    }else{
      if(!user || !user.name || (success&&updated)){
        //This keeps it from going on an infinite loop after updating
        setUpdated(false)
        dispatch({ type: USER_UPDATE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      }else {
        setName(user.name)
        setEmail(user.email)
        setMailingList(user.mailingList)
        setAddress(user.shippingAddress.address)
        setCity(user.shippingAddress.city)
        setState(user.shippingAddress.state)
        setProvince(user.shippingAddress.province)
        setCountry(user.shippingAddress.country)
        setZip(user.shippingAddress.zip)
        setShippingAddress(user.shippingAddress)
      }
    }
  },[dispatch, history, userInformation, user, success])
  const handleSubmit = (e) => {
    e.preventDefault();
    //In case chrome autofills pw, it will not throw an error if drop down to change pw is not open
    if(password!==confirm&&userUpdatePassword){
      setMessage('Passwords do not match!')
    }else{
      dispatch(updateUser({id:user._id,name,email,password,mailingList,shippingAddress}))
      setUserUpdatePassword(false)
      setPassword('')
      setConfirm('')
    }
    setUpdated(true)

  };

  return (
    <Grid container justifyContent="center" spacing={6} style={{marginTop:35, marginBottom: 45, padding:20}}>
      <Grid item sm={12} xs={12} md={4}>
        <Paper elevation={7} style={{padding:20}}>
        <Typography variant="h5">
          {name}'s Account
        </Typography>
        <Grid item>
          {message && <div style={{width:'250px', margin:8}}><Message severity='error' >{message}</Message></div>}
          {success && <div style={{width:'250px', marginTop:8}}><Message severity='success' >Profile Successfully Updated!</Message></div>}
          {error && <Message severity='error'>{error}</Message>}
        </Grid>
        {loading && <Loader />}
        <form className={classes.form} noValidate onSubmit={handleSubmit} >
        <TextField variant="outlined" margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <FormGroup onChange={(e) => setUserUpdatePassword(!userUpdatePassword)} >
            <FormControlLabel control={<Checkbox />} label='Update Password' />
          </FormGroup>
          {userUpdatePassword&&
            <div>
              <TextField variant="outlined" margin="normal" required autoComplete='' fullWidth name="password" label="Password"
                type="password" id="password" value={password}
                onChange={(e) => {
                setPassword(e.target.value);
              }}
              />
              <TextField variant="outlined" margin="normal" required fullWidth name="confirm" label="Confirm Password" type="password"
                id="confirm" value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
              />
            </div>
          }                            
          <TextField autoComplete="address" variant="outlined" margin="normal" required fullWidth id="address"
            label="Address" name="address" autoComplete="address" value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setShippingAddress({...shippingAddress,address:e.target.value})
            }}
          />
          <TextField variant="outlined" margin="normal" required fullWidth id="city"
            label="City" name="city" autoComplete="address" value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShippingAddress({...shippingAddress,city:e.target.value})
            }}
          />
          <Autocomplete id="Country" style={{marginBottom:10}}options={countries} value={country} getOptionLabel={(option) => option} className={classes.Additional}
            onChange={(e, newInputValue) => {
              setCountry(newInputValue);
              setShippingAddress({...shippingAddress,country:newInputValue})
            }}
            renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
          />
          {country==='United States' &&
          <Autocomplete id="States" options={states} value={state} getOptionLabel={(option) => option} className={classes.Additional}
            onChange={(event, newInputValue) => {
              setState(newInputValue);
              setProvince('')
              setShippingAddress({...shippingAddress,state:newInputValue})
            }}
            renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
          />}
          {country==='Canada' &&
          <Autocomplete id="Province" options={provinces} value={province} getOptionLabel={(option) => option} className={classes.Additional}
            onChange={(event, newInputValue) => {
              setProvince(newInputValue);
              setState('')
              setShippingAddress({...shippingAddress,province:newInputValue})
            }}
            renderInput={(params) => <TextField {...params} label="Province" variant="outlined"/>} 
          />}
          <TextField variant="outlined" margin="normal" required fullWidth id="zip"
            label="Postal Code" name="zip" autoComplete="zip" value={zip}
            onChange={(e) => {
              setZip(e.target.value);
              setShippingAddress({...shippingAddress,zip:e.target.value})
            }}
          />
            <FormGroup onChange={(e) => setMailingList(!mailingList)} >
              <FormControlLabel control={<Checkbox checked={mailingList}/>} label='On mailing list' />
            </FormGroup>
          <CustomButton text={'Update'}/>
        </form>
         <Divider className={classes.divider}/>
        </Paper>
      </Grid>      
      <Grid item md={8} sm={12} xs={12}>
        <Paper elevation={7} style={{padding:20}}>
        <Typography variant="h5">
          Orders
        </Typography>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message severiy='error'>{errorOrders}</Message>
        ) : (
          <TableContainer style={{overflowX:'scroll'}}>
          <Table className={classes.table} style={{marginTop:20}}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>DATE</StyledTableCell>
                <StyledTableCell>TOTAL</StyledTableCell>
                <StyledTableCell>PAID</StyledTableCell>
                <StyledTableCell>SHIPPED</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <StyledTableRow key={order._id}>
                  <StyledTableCell>
                    <RouterLink to={`/orders/${order._id}`} style={{color:'#067e78'}}>
                      <Button style={{color:'#067e78'}}>
                        {order._id}
                      </Button>
                    </RouterLink>
                  </StyledTableCell>
                  <StyledTableCell>{order.createdAt.substring(0, 10)}</StyledTableCell>
                  <StyledTableCell>${order.totalPrice}</StyledTableCell>
                    {order.isPaid ? (
                      <StyledTableCell>{order.paidAt.substring(0, 10)}</StyledTableCell>
                    ) : (
                      <StyledTableCell> </StyledTableCell>
                    )}
                    {order.isShipped ? (
                      <StyledTableCell>{order.shippedAt.substring(0, 10)}</StyledTableCell>
                    ) : (
                      <StyledTableCell><CloseIcon className={classes.Icon}/></StyledTableCell>
                    )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        )}
      </Paper>
      </Grid>
    </Grid>

  );
}

export default AccountScreen




