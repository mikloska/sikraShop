import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import Grid from '@material-ui/core/Grid'
// import axios from 'axios'
import {listProducts} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'



const HomeScreen = ({match}) => {
  const dispatch = useDispatch()
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  // const [products,setProducts] = useState([])
  const productList = useSelector(state => state.productList)
  const {loading, error, products, page, pages} = productList
  useEffect(()=>{
    dispatch(listProducts(keyword, pageNumber))

    // axios.get('/api/products')
    //   .then(res => {
    //   setProducts(res.data);
    // })
    // .catch(err => console.log(err))
  },[dispatch, keyword, pageNumber])


  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader/> : error ? <Message severity='error'>{error}</Message> : 
      <Grid container spacing={6} justifyContent="center">
        {products.map((product) => (
          
          <Grid item xs={12}sm = {12} md = {6} lg = {4} xl = {3} key ={product.price} style={{textAlign:"center"}}>
            <Product product = {product} key ={product.id}/>
          </Grid>
        ))}
        <Grid item lg={11} md={11} style={{display:'flex',justifyContent:'center'}} ><Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/></Grid>
      </Grid>}
    </div>
  )
}

export default HomeScreen;