import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import {Grid, Typography} from '@material-ui/core'
// import axios from 'axios'
import {listProductByCategory} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_CATEGORY_LIST_RESET } from '../constants/productConstants'



const CategoryScreen = ({match}) => {
  const dispatch = useDispatch()
  const current = match.path.split('/')[1]
  // const [products,setProducts] = useState([])
  const productListCategory = useSelector(state => state.productListCategory)
  const {loading, error, productsCategory} = productListCategory
  useEffect(()=>{
    // dispatch({ type: PRODUCT_CATEGORY_LIST_RESET })
    dispatch(listProductByCategory(current))
    // console.log(current)
    // axios.get('/api/products')
    //   .then(res => {
    //   setProducts(res.data);
    // })
    // .catch(err => console.log(err))
  },[dispatch, match])


  return (
    <div>
      
      <Typography variant='h4' style={{marginBottom:40}}>
        {current==='necklaces' ? 'Neckalces & Pendants':current.charAt(0).toUpperCase() + current.slice(1)}
      </Typography>
      {loading ? <Loader/> : error ? <Message severity='error'>{error}</Message> : 
      <Grid container spacing={6} justifyContent="center">
        {productsCategory.map((product) => (
          
          <Grid item xs={12}sm = {12} md = {6} lg = {4} xl = {3} key ={product.price} style={{textAlign:"center"}}>
            <Product product = {product} key ={product.id}/>
          </Grid>
        ))}
      </Grid>}
    </div>
  )
}

export default CategoryScreen;