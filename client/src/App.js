import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Container from '@material-ui/core/Container'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <>
        <Navbar/>
          <Container>
            <Route path ='/' component={HomeScreen} exact/>
            <Route path ='/product/:id' component={ProductScreen} />
          </Container>

        <Footer/>
          
      </>
    </Router>
)}

export default App;