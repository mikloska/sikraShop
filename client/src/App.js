import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Container from '@material-ui/core/Container'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { makeStyles } from '@material-ui/core/styles';

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
            <Route path ='/signin' component={SignIn} exact/>
            <Route path ='/signup' component={SignUp} exact/>
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