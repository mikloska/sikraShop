import React, { useState, useEffect } from 'react';
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container, Tab, Tabs, TabPanel} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Link as RouterLink, useParams, useLocation,BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {register} from '../actions/userActions'
import AltSignInScreen from '../screens/AltSignInScreen'
import ShippingScreen from '../screens/ShippingScreen'
import PaymentScreen from '../screens/PaymentScreen'

const CheckoutSteps = (props)=>{
  const { step1, step2, step3, step4, tab} = props
  const basket = useSelector((state) => state.basket)
  const {basketItems} = basket
  const { shippingAddress } = basket
  const history=useHistory()
  // const tabObj = {login:<SignInScreen/>, shipping: <ShippingScreen/>}
  const tabObj = {login:0, shipping: 1}
  const [value,setValue] = useState(tab)
  const routes = ['/login','/shipping','/payment','/completeorder']
  // const { children, value, index, ...other } = props;
  const handleTabs = (e,val) =>{
    setValue(val)
    history.push(routes[val])
  }

  useEffect(()=>{

  },[])
  return (
    <div>
    <Router>
    <Tabs style={{paddingBottom: 30}} centered value={value} onChange={handleTabs}>
      {step1 ? (
          <Tab label="Sign In" component={RouterLink} to={routes[0]}></Tab>
      ) : (
        <Tab label="Sign In" disabled />
      )}

      {step2 ? (
          <Tab label="Shipping" component={RouterLink} to={routes[1]}></Tab>
      ) : (
        <Tab label="Shipping" disabled />
      )}

      {step3&&shippingAddress ? (
          <Tab label="Payment"  component={RouterLink} to={routes[2]}/>
      ) : (
        <Tab label="Payment" disabled />
      )}

      {step4 ? (
          <Tab label="Complete Order"/>
      ) : (
        <Tab label="Complete Order" disabled/>
      )}

    {/* <TabPanel value={0} index={0}>
      Item One
    </TabPanel>
    <TabPanel value={1} index={1}>
      Item Two
    </TabPanel>
    <TabPanel value={2} index={2}>
      Item Three
    </TabPanel>
    <TabPanel value={3} index={3}>
      Item Four
    </TabPanel> */}
  </Tabs>
  {/* {value === 2 && <ShippingScreen/>} */}
  {/* {value === 0 && <AltSignInScreen/>}
  {value === 3 && <PaymentScreen/>}
  {value === 2 && <ShippingScreen/>} */}
      {/* <Switch>
        <Route path="/:id" children={<Child value={value}/>} />
      </Switch> */}
    </Router>
  </div>
  )
}

// function Child() {
//   let { id } = useParams();
//   // const tabObj = {login:<SignInScreen/>, shipping: <ShippingScreen/>}
//   // We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   useEffect(()=>{
    
//   },[id])
  
//   // setValue(id)

//   return (
//     <div>
//       {id}
//       {/* {value} */}
//       {/* {tabObj[id]} */}
//     </div>
//   );
// }

export default CheckoutSteps 