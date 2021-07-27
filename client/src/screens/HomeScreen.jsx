import React, {useState, useEffect} from 'react'
import Product from '../components/Product'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'



const HomeScreen = () => {
  const [products,setProducts] = useState([])

  useEffect(()=>{
    axios.get('/api/products')
      .then(res => {
      setProducts(res.data);
    })
    .catch(err => console.log(err))
  },[])

  return (
    <div>
      <h1>Latest Products</h1>
      <Grid container spacing={6} justifyContent="center">
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