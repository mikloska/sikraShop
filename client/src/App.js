import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Container from '@material-ui/core/Container'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import BasketScreen from './screens/BasketScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import AboutScreen from './screens/AboutScreen';
import AccountScreen from './screens/AccountScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import newScreen from './screens/newScreen';
import CheckoutSteps from './components/CheckoutSteps';

const useStyles = makeStyles({
  ScrollIcon: {
    // top: -70,
    transform: "rotate(-90deg)",
    // position: ""
    marginBottom: -55
  },
  ScrollParent:{
    textAlign:'center',
    marginTop:20
  }
});

const App = (showBelow) => {
  const [show, setShow] = useState(showBelow ? false : true)
  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
        if (!show) setShow(true)
    } else {
        if (show) setShow(false)
    }
}

const handleScrollClick = () => {
  window[`scrollTo`]({ top: 0, behavior: `smooth` })
}

useEffect(() => {
    if (showBelow) {
        window.addEventListener(`scroll`, handleScroll)
        return () => window.removeEventListener(`scroll`, handleScroll)
    }
})
  const classes = useStyles();
  return (
    <Router>
      <>
        <div className = 'page-wrap'>
        <Navbar/>
          <Container className='main-container'>
            <Route path ='/' component={HomeScreen} exact/>
            <Route path ='/product/:id' component={ProductScreen} />
            <Route path ='/login' component={SignInScreen} />
            <Route path ='/signup' component={SignUpScreen} />
            <Route path ='/basket/:id?' component={BasketScreen}/>
            <Route path ='/necklaces' />
            <Route path ='/earrings' />
            <Route path ='/rings' />
            <Route path ='/bracelets' />
            <Route path ='/custom'/>
            <Route path ='/about' component={AboutScreen}/>
            {/* <Route path='/login' component={BasketScreen}/> */}
            <Route path='/account' component={AccountScreen}/>
            <Route path='/checkout' component={CheckoutSteps}/>
            <Route path='/shipping' component={ShippingScreen}/>
            <Route path='/payment' component={PaymentScreen}/>
            <Route path='/placeorder' component={OrderScreen}/>
          </Container>
          
        {/* {document.body.scrollHeight ? (
        <div className ={classes.ScrollParent}><PlayCircleFilledIcon  fontSize="large" className={classes.ScrollIcon} onClick={handleClick}/></div>
        ):(null)} */}
        </div>
        <Footer handleScrollClick={handleScrollClick} />
          
      </>
    </Router>
)}

export default App;