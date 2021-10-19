import React, { useState, useEffect } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({

}))

const Address=()=>{
  // const guest=useSelector(state=>state.guest.guestCheckout)
  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInformation } = userLogin
  //Redirect to login if userInfo is empty
  // if(!userInformation&&!guest) history.push('/login')
  const basket = useSelector((state) => state.basket)
  const {basketItems} = basket
  const { shippingAddress } = basket
  //Redirect to home page if basket is empty
  // if (basketItems.length === 0) history.push('/')
  const classes = useStyles();
  const dispatch = useDispatch()

  const defaultAddress =  shippingAddress ? shippingAddress.address : ''
  const defaultCity =  shippingAddress ? shippingAddress.city : ''
  const defaultZip =  shippingAddress ? shippingAddress.zip : ''
  const defaultCountry =  shippingAddress ? shippingAddress.country : ''
  const defaultState =  shippingAddress ? shippingAddress.state : ''
  const defaultProvince =  shippingAddress ? shippingAddress.province : ''
  const [address,setAddress]=useState(defaultAddress)
  const [city,setCity]=useState(defaultCity)
  const [zip,setZip]=useState(defaultZip)
  const [country,setCountry]=useState(defaultCountry)
  const [state,setState]=useState(defaultState)
  const [province,setProvince]=useState(defaultProvince)
  const [message, setMessage]=useState(null)
  // const statesTax= {'Alabama':.04,'Alaska':'N/A','American Samoa':'N/A','Arizona':.056,'Arkansas':.065,'California':.0725,'Colorado':.029,'Connecticut':.0635,'Delaware':'N/A','Washington D.C. (District of Columbia)':.0575,'Federated States of Micronesia':'N/A','Florida':.06,'Georgia':.04,'Guam':'N/A','Hawaii':.04,'Idaho':.06,'Illinois':.0625,'Indiana':.07,'Iowa':.06,'Kansas':.065,'Kentucky':.06,'Louisiana':.0445,'Maine':.055,'Marshall Islands':'N/A','Maryland':.06,'Massachusetts':.0625,'Michigan':.06,'Minnesota':.0688,'Mississippi':.07,'Missouri':.0423,'Montana':'N/A','Nebraska':.055,'Nevada':.0685,'New Hampshire':'N/A','New Jersey':.0663,'New Mexico':.0513,'New York':.04,'North Carolina':.0475,'North Dakota':.05,'Northern Mariana Islands':'N/A','Ohio':.0575,'Oklahoma':.045,'Oregon':'N/A','Palau':'N/A','Pennsylvania':.06,'Puerto Rico':'N/A','Rhode Island':.07,'South Carolina':.06,'South Dakota':.045,'Tennessee':.07,'Texas':.0625,'Utah':.0595,'Vermont':.06,'Virgin Island':'N/A','Virginia':.053,'Washington':.065,'West Virginia':.06,'Wisconsin':.05,'Wyoming':.04}
  let states=useSelector(state=>state.states)
  states = Object.keys(states)
  const provinces=useSelector(state=>state.provinces)
  const countries=useSelector(state=>state.countries)
  useEffect(() => {

  }, [country])

  return (
    <div>
      <TextField autoComplete="address" variant="outlined" margin="normal" required fullWidth id="address"
        label="Address" name="address" autoComplete="address" value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <TextField variant="outlined" margin="normal" required fullWidth id="city"
        label="City" name="city" autoComplete="address" value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <Autocomplete id="Country" options={countries} value={country} getOptionLabel={(option) => option} className={classes.Additional}
        onChange={(event, newInputValue) => {
          setCountry(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
      />
      {country==='United States' &&
      <Autocomplete id="States" options={states} value={state} getOptionLabel={(option) => option} className={classes.Additional}
        onChange={(event, newInputValue) => {
          setState(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
        
      />}
      {country==='Canada' &&
      <Autocomplete id="Province" options={provinces} value={province} getOptionLabel={(option) => option} className={classes.Additional}
        onChange={(event, newInputValue) => {
          setProvince(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Province" variant="outlined"/>}
        
      />}
      <TextField variant="outlined" margin="normal" required fullWidth id="zip"
        label="Postal Code" name="zip" autoComplete="zip" value={zip}
        onChange={(e) => {
          setZip(e.target.value);
        }}
      />

    </div>
  )
}


export default Address