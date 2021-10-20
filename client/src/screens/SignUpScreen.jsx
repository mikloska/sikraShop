import React, { useState, useEffect } from 'react';
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container, FormGroup, FormControlLabel, Checkbox} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {register} from '../actions/userActions'
import axios from 'axios'
import {GUEST_FALSE} from '../constants/userConstants';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const SignUpScreen = ({ isLoggedIn, setIsLoggedIn }) => {
  let states=useSelector(state=>state.states)
  states = Object.keys(states)
  const provinces=useSelector(state=>state.provinces)
  const countries=useSelector(state=>state.countries)
  const [submitAddress, setSubmitAddress] = useState(false)
  const [mailingList, setMailingList] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({address:'',city:'',state:'',province:'',country:'',zip:''})
  const redirect= location.search ? location.search.split('=')[1] : '/'
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
  const userRegister=useSelector(state=>state.userRegister)
  const {loading,error,userInformation}=userRegister

  const [address,setAddress]=useState('')
  const [city,setCity]=useState('')
  const [zip,setZip]=useState('')
  const [country,setCountry]=useState('')
  const [state,setState]=useState('')
  const [province,setProvince]=useState('')

  useEffect(()=>{
    if(userInformation) history.push(redirect)
  },[history, userInformation, redirect])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password!==confirm){
      setMessage('Passwords do not match!')
    }else if(name===''||email===''||password===''){
      setMessage('Please fill out all fields!')    
    }else{
       dispatch(register(name,email,password,mailingList, shippingAddress))

      dispatch({type:GUEST_FALSE})
      axios.post('/api/email/signup',{usersName:name,userEmail:email})
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
                <PermIdentityIcon/>
              </Avatar>
               <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              {message && <Message severity='error' style={{marginTop:20}}>{message}</Message>}
              {error && <Message severity='error' style={{marginTop:20}}>{error}</Message>}
              {loading && <Loader />}
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
                <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password"
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
                <FormGroup onChange={(e) => setMailingList(!mailingList)} >
                  <FormControlLabel control={<Checkbox />} label='Sign up for mailing list' />
                </FormGroup>
                <FormGroup onChange={(e) => setSubmitAddress(!submitAddress)} >
                  <FormControlLabel control={<Checkbox />} label='Save shipping address' />
                </FormGroup>

                {submitAddress&&
                  <div>
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
                    <Autocomplete id="Country" options={countries} value={country} getOptionLabel={(option) => option} className={classes.Additional}
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
                        setShippingAddress({...shippingAddress,state:e.target.value})
                      }}
                      renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
                      
                    />}
                    {country==='Canada' &&
                    <Autocomplete id="Province" options={provinces} value={province} getOptionLabel={(option) => option} className={classes.Additional}
                      onChange={(event, newInputValue) => {
                        setProvince(newInputValue);
                        setShippingAddress({...shippingAddress,province:e.target.value})
                      }}
                      renderInput={(params) => <TextField {...params} label="Province" variant="outlined"/>}
                      
                    />}
                    <TextField variant="outlined" margin="normal" required fullWidth id="zip"
                      label="Postal Code" name="zip" autoComplete="zip" value={zip}
                      onChange={(e) => {
                        setZip(e.target.value);
                        setShippingAddress({...shippingAddress,zip:e.target.value})
                        // console.log(shippingAddress)
                      }}
                    />
                  </div>
                }
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Sign Up
                </Button>
                <Grid container>
                   <Grid item xs={11}>
                    <Link component={RouterLink} to={redirect ? `/login?redirect=${redirect}`:'/login'} variant="body2" color='inherit'>
                      {"Already have an account?"}
                    </Link>
                  </Grid>
                </Grid>
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

export default SignUpScreen