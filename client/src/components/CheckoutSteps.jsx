import React, { useState, useEffect } from 'react';
import {Avatar, Button, Card, TextField, Link, Grid, Box, Paper, Typography, Divider, Container, Tab, Tabs, TabPanel} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, styled } from '@material-ui/core/styles';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {register} from '../actions/userActions'
import SignInScreen from '../screens/SignInScreen'

const CheckoutSteps =({ step1, step2, step3, step4 })=>{
  const routes = ['/login','/shipping','/payment','/completeorder=']
  // const { children, value, index, ...other } = props;
  return (
    <Tabs style={{paddingBottom: 30}} centered value={0}>
      {step1 ? (
          <Tab label="Sign In" value={0} to={'/login'}/>
      ) : (
        <Tab label="Sign In" disabled value={0}/>
      )}

      {step2 ? (
          <Tab label="Shipping" value={1} to={routes[1]}/>
      ) : (
        <Tab label="Shipping" disabled value={1}/>
      )}

      {step3 ? (
          <Tab label="Payment" value={2} to={routes[2]}/>
      ) : (
        <Tab label="Payment" disabled value={2}/>
      )}

      {step4 ? (
          <Tab label="Complete Order" value={3} to={routes[3]}/>
      ) : (
        <Tab label="Complete Order" disabled value={3}/>
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
  )
}

export default CheckoutSteps