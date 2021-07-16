import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Container from '@material-ui/core/Container'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const App = () => {
  return (
    <Router>
      <>
        <Navbar/>
          <Container>
            <Route path ='/' component={HomeScreen} exact/>
            <Route path ='/product/:id' component={ProductScreen} />
            <Route path ='/product/:id' component={ProductScreen} />
            <Route path ='/signin' component={SignIn} exact/>
            <Route path ='/signup' component={SignUp} exact/>
          </Container>

        <Footer/>
          
      </>
    </Router>
)}

export default App;