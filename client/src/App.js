import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Container from '@material-ui/core/Container'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import BasketScreen from './screens/BasketScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import AboutScreen from './screens/AboutScreen';
import AccountScreen from './screens/AccountScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import SearchScreen from './screens/SearchScreen';
import CategoryScreen from './screens/CategoryScreen';
import ContactScreen from './screens/ContactScreen';
import CustomScreen from './screens/CustomScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
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
        <div className = 'page-wrap' style={{padding:0}}>
        <Navbar/>
          <Container className='main-container' style={{padding:0}}>
            <Switch>
              <Route path ='/' component={HomeScreen} exact/>
              <Route path='/search/:keyword' component={SearchScreen} exact/>
              <Route path='/page:pageNumber' component={HomeScreen} exact />
              <Route path='/search/:keyword/page:pageNumber' component={SearchScreen} />
              <Route path ='/search/:keyword/product/:id' component={ProductScreen} exact/>
              <Route path ='/:id/product/:id' component={ProductScreen} exact/>
              <Route path ='/product/:id' component={ProductScreen} exact/>
              <Route path ='/login' component={SignInScreen} />
              <Route path ='/signup' component={SignUpScreen} />
              <Route path ='/basket/:id?' component={BasketScreen}/>
              <Route path ='/necklaces/page:pageNumber' render={ (props)=><CategoryScreen {...props} handleScrollClick={handleScrollClick}/>} />
              <Route path ='/earrings/page:pageNumber' component={CategoryScreen}/>
              <Route path ='/rings/page:pageNumber' component={CategoryScreen}/>
              <Route path ='/bracelets/page:pageNumber' component={CategoryScreen}/>
              <Route path ='/necklaces' component={CategoryScreen} handleScrollClick={handleScrollClick}/>
              <Route path ='/earrings' component={CategoryScreen}/>
              <Route path ='/rings' component={CategoryScreen}/>
              <Route path ='/bracelets' component={CategoryScreen}/>
              {/* <Route path ='/necklaces' component={ProductScreen}/>
              <Route path ='/earrings' component={ProductScreen}/>
              <Route path ='/rings' component={ProductScreen}/>
              <Route path ='/bracelets' component={ProductScreen}/> */}
              <Route path ='/custom' component={CustomScreen}/>
              <Route path ='/about' component={AboutScreen}/>
              <Route path ='/contact' component={ContactScreen}/>
              {/* <Route path='/login' component={BasketScreen}/> */}
              <Route path='/account' component={AccountScreen}/>
              <Route path='/checkout' component={CheckoutSteps}/>
              <Route path='/shipping' component={ShippingScreen}/>
              <Route path='/payment' component={PaymentScreen}/>
              <Route path='/placeorder' component={PlaceOrderScreen}/>
              <Route path='/orders/:id' component={OrderScreen}/>
              <Route path='/admin/orderlist' component={OrderListScreen} />
              <Route path='/admin/userlist' component={UserListScreen}/>
              <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
              <Route path='/admin/productlist' component={ProductListScreen} exact/>
              <Route path='/admin/productlist/page:pageNumber' component={ProductListScreen}/>
              <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
              <Route path ='/passwordreset' component={ForgotPasswordScreen}/>
              
              <Route component={NotFound}/>

            </Switch>
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