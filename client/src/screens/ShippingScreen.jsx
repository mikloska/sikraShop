import React, { useState, useEffect } from 'react';
import {Avatar, Button, Card, TextField, Box, Paper, Typography, Container,Checkbox,FormGroup, FormControlLabel} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../components/Message'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress, savePaymentMethod, saveGuestInfo } from '../actions/basketActions'
import CheckoutSteps from '../components/CheckoutSteps';
import CustomButton from '../components/CustomButton'
import {updateUser,getUserDetails} from '../actions/userActions'

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
  Additional: {
    marginTop:15
  }

}));

const ShippingScreen = ({history}) =>{
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin
  const userDetails=useSelector(state=>state.userDetails)
  const {loading,error,user}=userDetails
  useEffect(() => {
    //Get user details in case user is logged in and app was refreshed
    if(userInformation&&!user){
      dispatch(getUserDetails('profile'))
    } 
  }, [country])

  let states=useSelector(state=>state.states)
  states = Object.keys(states)
  const provinces=useSelector(state=>state.provinces)
  const countries=useSelector(state=>state.countries)
  const guest=useSelector(state=>state.guest.guestCheckout)
  //Redirect to login if userInfo is empty
  if(!userInformation&&!guest) history.push('/login')
  const basket = useSelector((state) => state.basket)
  const {basketItems,shippingAddress} = basket
  //Redirect to home page if basket is empty
  if (basketItems.length === 0) history.push('/')
  const classes = useStyles();
  const dispatch = useDispatch()
  //Only need email and name here if guest
  const [name, setName] = useState(basket.guestInfo?basket.guestInfo.name:' ');
  const [email, setEmail] = useState(basket.guestInfo?basket.guestInfo.email:' ');
  const [newShippingAddress, setNewShippingAddress] = useState([])
  const [updateSavedAddress, setUpdateSavedAddress] = useState(false)
  const [usingSavedAddress, setUsingSavedAddress] = useState(false)
  const [address,setAddress]=useState((shippingAddress&&shippingAddress.address)?shippingAddress.address:'')
  const [city,setCity]=useState((shippingAddress&&shippingAddress.city)?shippingAddress.city:'')
  const [zip,setZip]=useState((shippingAddress&&shippingAddress.zip)?shippingAddress.zip:'')
  const [country,setCountry]=useState((shippingAddress&&shippingAddress.country)?shippingAddress.country:'')
  const [state,setState]=useState((shippingAddress&&shippingAddress.state)?shippingAddress.state:'')
  const [province,setProvince]=useState((shippingAddress&&shippingAddress.province)?shippingAddress.province:'')
  const [message, setMessage]=useState(null)
  const tab = 1
  // const statesTax= {'Alabama':.04,'Alaska':'N/A','American Samoa':'N/A','Arizona':.056,'Arkansas':.065,'California':.0725,'Colorado':.029,'Connecticut':.0635,'Delaware':'N/A','Washington D.C. (District of Columbia)':.0575,'Federated States of Micronesia':'N/A','Florida':.06,'Georgia':.04,'Guam':'N/A','Hawaii':.04,'Idaho':.06,'Illinois':.0625,'Indiana':.07,'Iowa':.06,'Kansas':.065,'Kentucky':.06,'Louisiana':.0445,'Maine':.055,'Marshall Islands':'N/A','Maryland':.06,'Massachusetts':.0625,'Michigan':.06,'Minnesota':.0688,'Mississippi':.07,'Missouri':.0423,'Montana':'N/A','Nebraska':.055,'Nevada':.0685,'New Hampshire':'N/A','New Jersey':.0663,'New Mexico':.0513,'New York':.04,'North Carolina':.0475,'North Dakota':.05,'Northern Mariana Islands':'N/A','Ohio':.0575,'Oklahoma':.045,'Oregon':'N/A','Palau':'N/A','Pennsylvania':.06,'Puerto Rico':'N/A','Rhode Island':.07,'South Carolina':.06,'South Dakota':.045,'Tennessee':.07,'Texas':.0625,'Utah':.0595,'Vermont':.06,'Virgin Island':'N/A','Virginia':.053,'Washington':.065,'West Virginia':.06,'Wisconsin':.05,'Wyoming':.04}

  const handleSubmit = (e) => {
    e.preventDefault()
    if((country==='United States'&&state==='')||(country==='Canada'&&province==='')||address===''||city===''||zip===''||country===''){
      setMessage('Please fill out all fields!')
    }
    else{
      e.preventDefault()
      //Update user address here if previous was blank or if they want to update saved.
      if(updateSavedAddress) dispatch(updateUser({id:user._id,mailingList:user.mailingList,shippingAddress:newShippingAddress}))
      
      dispatch(saveGuestInfo({name:name, email:email}))
      dispatch(saveShippingAddress({ address, city, zip, country, state, province }))
      dispatch(savePaymentMethod('PayPal'))
      
      history.push('/placeorder')
    }
  }
  const useSavedAddress=(e)=>{
    e.preventDefault()
    setUsingSavedAddress(true)
    setAddress(user.shippingAddress.address)
    setCity(user.shippingAddress.city)
    setZip(user.shippingAddress.zip)
    setCountry(user.shippingAddress.country)
    if(user.shippingAddress.state && user.shippingAddress.state!=='') setState(user.shippingAddress.state)
    if(user.shippingAddress.province && user.shippingAddress.province!=='') setProvince(user.shippingAddress.province)
  }

  return (
    <div style={{marginTop:35, marginBottom: 45, padding:20}}>
    <CheckoutSteps step2 step3 tab={tab}/>
    <Container component="main" maxWidth="xs">
    <Paper pt={0} elevation={7}>
      <Card className={classes.card} >
        <Box p={6} >
          <div className={classes.paper}>
            <Avatar className={classes.avatar} >
              <LocalShippingIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Shipping
            </Typography>
            {(user&&user.shippingAddress&&user.shippingAddress.address!==''&&!updateSavedAddress)&&
              <CustomButton style={{marginTop: 40}} onClick={useSavedAddress} text={'Use Saved Address'}/>
            }
            {(user&&user.shippingAddress&&user.shippingAddress.address!==''&&usingSavedAddress)&&
              <FormGroup onChange={(e) => setUpdateSavedAddress(!updateSavedAddress)}>
                <FormControlLabel control={<Checkbox checked={updateSavedAddress} onClick={()=>{setAddress(''),setCity('');setState('');setProvince('');setZip('');setCountry('')}}/>} label='Update Saved Address'/>
              </FormGroup>
            }
            <form className={classes.form} noValidate onSubmit={handleSubmit} >
              {guest&&(
                <div>
                <TextField variant="outlined" margin="normal" required fullWidth id="name" label="Name"
                  /*The dispatch function causes issues if the user is not a guest and it dispatches an empty string. Therefore, 
                  I added 'name' and 'email' to be default values of name and email. This ternary makes sure that nothing is in 
                  the text box as default value instead of the word name and email*/
                  name="name" autoComplete="name" value={name==='name'?'':name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address"
                  name="email" autoComplete="email" value={email==='email'?'':email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                </div>
              )}
              <TextField autoComplete="address" variant="outlined" margin="normal" required fullWidth id="address"
                label="Address" name="address" autoComplete="address" value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setNewShippingAddress({...newShippingAddress,address:e.target.value});
                }}
              />
              <TextField variant="outlined" margin="normal" required fullWidth id="city"
                label="City" name="city" autoComplete="address" value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setNewShippingAddress({...newShippingAddress,city:e.target.value});
                }}
              />
              <Autocomplete id="Country" options={countries} value={country} getOptionLabel={(option) => option} className={classes.Additional}
                onChange={(event, newInputValue) => {
                  setCountry(newInputValue);
                  setNewShippingAddress({...newShippingAddress,country:newInputValue})
                }}
                renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
              />
              {country==='United States' &&
              <Autocomplete id="States" options={states} value={state} getOptionLabel={(option) => option} className={classes.Additional}
                onChange={(e, newInputValue) => {
                  setState(newInputValue);
                  setProvince('')
                  setNewShippingAddress({...newShippingAddress,state:newInputValue})
                }}
                renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
                
              />}
              {country==='Canada' &&
              <Autocomplete id="Province" options={provinces} value={province} getOptionLabel={(option) => option} className={classes.Additional}
                onChange={(e, newInputValue) => {
                  setProvince(newInputValue);
                  setState('')
                  setNewShippingAddress({...newShippingAddress,province:newInputValue})
                }}
                renderInput={(params) => <TextField {...params} label="Province" variant="outlined"/>}
                
              />}
              <TextField variant="outlined" margin="normal" required fullWidth id="zip"
                label="Postal Code" name="zip" autoComplete="zip" value={zip}
                onChange={(e) => {
                  setZip(e.target.value);
                  setNewShippingAddress({...newShippingAddress,zip:e.target.value})
                }}
              />
            {(user&&user.shippingAddress&&user.shippingAddress.address==='')&&
              <FormGroup onChange={(e) => setUpdateSavedAddress(!updateSavedAddress)}>
                <FormControlLabel control={<Checkbox checked={updateSavedAddress} />} label='Save Address' />
              </FormGroup>
            }
              <CustomButton style={{marginTop: 40}} text={shippingAddress && shippingAddress.address?'Update Shipping Address':'Continue to Payment'}/>
            </form>
            {message && <Message style={{width:'100%',marginTop:8}} severity='error' >{message}</Message>}
          </div>
        </Box>
      </Card>
    </Paper>
  </Container>
    </div>
  )
}

export default ShippingScreen



