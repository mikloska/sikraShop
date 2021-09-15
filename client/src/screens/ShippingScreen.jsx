import React, { useState, useEffect } from 'react';
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress, savePaymentMethod } from '../actions/basketActions'
import CheckoutSteps from '../components/CheckoutSteps';

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
    marginTop: 40,
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },
  Additional: {
    marginTop:15
  }

}));

const ShippingScreen = ({history}) =>{
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin
  //Redirect to login if userInfo is empty
  if(!userInformation) history.push('/login')
  const basket = useSelector((state) => state.basket)
  const {basketItems} = basket
  const { shippingAddress } = basket
  //Redirect to home page if basket is empty
  if (basketItems.length === 0) history.push('/')
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
  const tab = 1
  // if(shippingAddress){
  //   setAddress(address)
  // }
  const statesTax= {'Alabama':.04,'Alaska':'N/A','American Samoa':'N/A','Arizona':.056,'Arkansas':.065,'California':.0725,'Colorado':.029,'Connecticut':.0635,'Delaware':'N/A','Washington D.C. (District of Columbia)':.0575,'Federated States of Micronesia':'N/A','Florida':.06,'Georgia':.04,'Guam':'N/A','Hawaii':.04,'Idaho':.06,'Illinois':.0625,'Indiana':.07,'Iowa':.06,'Kansas':.065,'Kentucky':.06,'Louisiana':.0445,'Maine':.055,'Marshall Islands':'N/A','Maryland':.06,'Massachusetts':.0625,'Michigan':.06,'Minnesota':.0688,'Mississippi':.07,'Missouri':.0423,'Montana':'N/A','Nebraska':.055,'Nevada':.0685,'New Hampshire':'N/A','New Jersey':.0663,'New Mexico':.0513,'New York':.04,'North Carolina':.0475,'North Dakota':.05,'Northern Mariana Islands':'N/A','Ohio':.0575,'Oklahoma':.045,'Oregon':'N/A','Palau':'N/A','Pennsylvania':.06,'Puerto Rico':'N/A','Rhode Island':.07,'South Carolina':.06,'South Dakota':.045,'Tennessee':.07,'Texas':.0625,'Utah':.0595,'Vermont':.06,'Virgin Island':'N/A','Virginia':.053,'Washington':.065,'West Virginia':.06,'Wisconsin':.05,'Wyoming':.04}
  const states = Object.keys(statesTax)
  const provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon Territory']
  const countries = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State Of", "Bonaire, Sint Eustatius And Saba", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Côte D'ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State Of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension And Tristan Da Cunha", "Saint Kitts And Nevis", "Saint Lucia", "Saint Martin (french Part)", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic Of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, zip, country, state, province }))
    dispatch(savePaymentMethod('PayPal'))
    history.push('/placeorder')
  }

  useEffect(() => {

  }, [country])


  return (
    <div  style={{marginTop:35, marginBottom: 45, padding:20}}>
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
            {/* {error && <Message severity='error'>{error}</Message>}
            {loading && <Loader />} */}
            <form className={classes.form} noValidate onSubmit={handleSubmit} >
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

              {/* <TextField variant="outlined" margin="normal" required fullWidth id="country"
                label="Country" name="country" autoComplete="address" value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              /> */}
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} style={{marginTop: 40}}>
                Continue to Payment
              </Button>
            </form>
          </div>
        </Box>
      </Card>
    </Paper>
  </Container>
    </div>
  )
}

export default ShippingScreen



