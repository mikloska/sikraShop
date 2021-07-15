import React from 'react'
import Product from '../components/Product'
import products from '../products'
import Grid from '@material-ui/core/Grid'



const HomeScreen = () => {
  return (
    <div>
      <h1>Latest Products</h1>
      <Grid container spacing={6} justify="center">
        {products.map((product) => (
          
          <Grid item xs={12}sm = {12} md = {6} lg = {4} xl = {3} key ={product.price} style={{textAlign:"center"}}>
            <Product product = {product} key ={product.id}/>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default HomeScreen;