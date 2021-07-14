import React from 'react'
import Product from '../components/Product'
import products from '../products'
import Grid from '@material-ui/core/Grid'



const HomeScreen = () => {
  return (
    <div>


    
      <h1>Latest Products</h1>
      <Grid container>
        {products.map((product) => (
          <Grid item sm = {12} md = {6} lg = {4} xl = {3}>
            <Product key ={product} product = {product}/>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default HomeScreen;