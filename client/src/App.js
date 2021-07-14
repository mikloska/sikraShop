import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Container from '@material-ui/core/Container'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <Navbar/>
        <Container>
          <HomeScreen/>
        </Container>

      <Footer/>
        
    </>
)}

export default App;